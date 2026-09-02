/**
 * AI Assists - API Abstraction Layer
 *
 * Provides the backend connection for AI features in the doc pages.
 * The UI (thinking states, streaming text, Q&A panels, feedback buttons)
 * is already built in the page views. This module provides the data.
 *
 * Usage:
 *   var result = await AIAssists.summary(articleText);
 *   var result = await AIAssists.explainCode(code, language);
 *   var result = await AIAssists.chat(message, pageContext);
 *   var result = await AIAssists.answerCodeQuestion(question, code, language);
 *
 * Configuration (set before load or via init):
 *   AIAssists.init({ endpoint: '/api/ai-assists', enabled: true });
 *
 * When the backend is not connected, returns mock responses so the UI
 * still works for demos. Set AIAssists.useMocks = false to disable.
 */
(function () {
  'use strict';

  var config = {
    endpoint: '/api/ai-assists',
    enabled: true,
    useMocks: true  // Flip to false when LLM backend is connected
  };

  // ── HTTP Client ────────────────────────────────────────────

  async function post(path, data) {
    try {
      var response = await fetch(config.endpoint + path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error(response.status);
      return await response.json();
    } catch (e) {
      if (config.useMocks) return null; // Fall through to mock
      throw e;
    }
  }

  // ── Summary ────────────────────────────────────────────────

  async function summary(content, pageId) {
    if (!config.enabled) return { summary: '' };

    // Try real API
    if (!config.useMocks) {
      var result = await post('/summary', { content: content, pageId: pageId });
      if (result) return result;
    }

    // Mock response for demo
    return {
      summary: "This article covers the fundamentals of working with the CMS platform, " +
        "including page creation, schema configuration, and content management workflows. " +
        "It provides step-by-step instructions for common tasks and references to the API documentation.",
      cached: false,
      mock: true
    };
  }

  // ── Code Explain ───────────────────────────────────────────

  async function explainCode(code, language) {
    if (!config.enabled) return { overview: '', breakdowns: [] };

    if (!config.useMocks) {
      var result = await post('/explain', { code: code, language: language });
      if (result) return result;
    }

    // Mock response
    return {
      overview: "This code snippet demonstrates how to create a new page using the CMS API. " +
        "It uses async/await syntax to handle the asynchronous API call and includes essential " +
        "parameters like name, schema, parent ID, and title.",
      breakdowns: [
        {
          lines: '1',
          code: code.split('\n')[0] || '',
          explanation: 'Initiates the API call. The await keyword pauses execution until the operation completes.'
        },
        {
          lines: '2-5',
          code: '  // configuration...',
          explanation: 'Passes configuration parameters defining the page structure, location, and content type.'
        }
      ],
      mock: true
    };
  }

  // ── Code Question ──────────────────────────────────────────

  async function answerCodeQuestion(question, code, language) {
    if (!config.enabled) return { answer: '' };

    if (!config.useMocks) {
      var result = await post('/chat', {
        message: question,
        pageContent: code,
        context: 'code-explain',
        language: language
      });
      if (result) return { answer: result.response };
    }

    // Mock response
    return {
      answer: "This is a demonstration answer. When connected to the AI backend, " +
        "this would analyze the specific code and provide a detailed, context-aware " +
        "response to your question about: " + question,
      mock: true
    };
  }

  // ── Chat ───────────────────────────────────────────────────

  async function chat(message, pageContent, pageTitle) {
    if (!config.enabled) return { response: '' };

    if (!config.useMocks) {
      var result = await post('/chat', {
        message: message,
        pageContent: pageContent,
        pageTitle: pageTitle,
        context: 'page-chat'
      });
      if (result) return result;
    }

    // Mock response
    return {
      response: "This is a demonstration response. When connected to the AI backend, " +
        "I would use the page content as context to answer your question accurately.",
      mock: true
    };
  }

  // ── Search (delegates to InSite Search + AI layer) ─────────

  async function searchWithAI(query, siteId) {
    if (!config.enabled) return { answer: '', results: [] };

    if (!config.useMocks) {
      var result = await post('/search', { query: query, siteId: siteId });
      if (result) return result;
    }

    // Mock — real search uses InSite Search service
    return {
      answer: "Based on the documentation, here's what I found about \"" + query + "\"...",
      results: [],
      mock: true
    };
  }

  // ── Status ─────────────────────────────────────────────────

  async function checkStatus() {
    try {
      var response = await fetch(config.endpoint + '/status');
      return await response.json();
    } catch (e) {
      return { enabled: false, connected: false, usingMocks: config.useMocks };
    }
  }

  // ── Init ───────────────────────────────────────────────────

  function init(options) {
    if (options) {
      if (options.endpoint) config.endpoint = options.endpoint;
      if (options.enabled !== undefined) config.enabled = options.enabled;
      if (options.useMocks !== undefined) config.useMocks = options.useMocks;
    }
  }

  // ── Public API ─────────────────────────────────────────────

  window.AIAssists = {
    init: init,
    summary: summary,
    explainCode: explainCode,
    answerCodeQuestion: answerCodeQuestion,
    chat: chat,
    searchWithAI: searchWithAI,
    checkStatus: checkStatus,
    config: config
  };
})();
