/**
 * API Service for Winning Insight
 * Handles all HTTP requests to the backend API
 * Usage: Import and use the api() function for all API calls
 */

(function() {
  'use strict';

  function buildDefaultApiBase() {
    const origin = window.location.origin || '';
    let path = window.location.pathname || '/';
    path = path.replace(/\/[^\/]*$/, '/');

    const markers = ['/public/', '/user_app/', '/user-end/', '/frontend/'];
    for (let i = 0; i < markers.length; i++) {
      const marker = markers[i];
      const pos = path.indexOf(marker);
      if (pos !== -1) {
        return origin + path.substring(0, pos) + '/api';
      }
    }

    if (path.indexOf('/index.php/') !== -1) {
      return origin + path.substring(0, path.indexOf('/index.php/')) + '/api';
    }

    return origin + path.replace(/\/$/, '') + '/api';
  }

  const PRODUCTION_API_BASE = 'https://lotteryintel247.com/api';
  const DEFAULT_API_BASE = buildDefaultApiBase();
  const API_BASE = (window.LI_API_BASE || PRODUCTION_API_BASE || DEFAULT_API_BASE).replace(/\/$/, '');

  /**
   * Get stored authentication token
   * @returns {string} Token or empty string
   */
  function getToken() {
    return localStorage.getItem('li_token') || '';
  }

  /**
   * Set authentication token
   * @param {string} token - Token to store
   */
  function setToken(token) {
    if (token) {
      localStorage.setItem('li_token', token);
    } else {
      localStorage.removeItem('li_token');
    }
  }

  /**
   * Check if user is logged in
   * @returns {boolean}
   */
  function isLoggedIn() {
    return !!getToken();
  }

  /**
   * Make API request
   * @param {string} path - API endpoint path (e.g., '/auth/login')
   * @param {object} body - Request body (optional, for POST/PUT)
   * @param {string} method - HTTP method (default: GET or POST based on body)
   * @returns {Promise<object>} API response
   */
  async function api(path, body, method) {
    const opts = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (getToken()) {
      opts.headers.Authorization = `Bearer ${getToken()}`;
    }

    if (body !== undefined && body !== null) {
      opts.method = method || 'POST';
      opts.body = JSON.stringify(body);
    } else {
      opts.method = method || 'GET';
    }

    let res, data;
    try {
      res = await fetch(API_BASE + path, opts);
      data = await res.json();
    } catch (error) {
      return {
        ok: false,
        message: 'Could not connect to the server. Please check the API base URL.',
        error: String(error),
      };
    }

    // Handle unauthorized (token expired or invalid)
    if (res.status === 401) {
      setToken('');
    }

    if (!data || typeof data !== 'object') {
      return {
        ok: false,
        message: 'Invalid server response.',
      };
    }

    return data;
  }

  /**
   * Get API base URL
   * @returns {string}
   */
  function getApiBase() {
    return API_BASE;
  }

  /**
   * Set API base URL override
   * @param {string} baseUrl
   */
  function setApiBase(baseUrl) {
    window.LI_API_BASE = baseUrl;
  }

  // Export to window for global access
  window.ApiService = {
    api,
    getToken,
    setToken,
    isLoggedIn,
    getApiBase,
    setApiBase,
  };
})();
