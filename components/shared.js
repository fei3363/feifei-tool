/**
 * FeiFei Tools - 共用元件
 * 提供導覽、主題切換、Toast 通知等共用功能
 */

// ========== 網站配置 ==========
const SITE_CONFIG = {
    name: 'FeiFei Tools',
    logo: '🛠️',
    domain: 'https://tool.feifei.tw',
    github: 'https://github.com/feifei-tw',
};

// ========== 工具列表 ==========
const TOOLS = {
    text: [
        { id: 'text-stats', name: '字數統計', icon: '🔢', href: 'text-stats.html', desc: '統計中英文字數、詞數、行數' },
        { id: 'chinese-conversion', name: '繁簡轉換', icon: '🔄', href: 'chinese-conversion.html', desc: '繁體/簡體中文互轉' },
        { id: 'conversion', name: '繁簡轉換 Pro', icon: '🔄', href: 'conversion.html', desc: '保留格式的繁簡轉換' },
        { id: 'pangu', name: '盤古之白', icon: '📏', href: 'pangu.html', desc: '中英文間自動加空白' },
        { id: 'text-diff', name: '文字差異比對', icon: '🔍', href: 'text-diff-tool.html', desc: '比較兩段文字的差異' },
        { id: 'highlight-replace', name: '文字取代', icon: '🖍️', href: 'highlight_replace.html', desc: '批量識別和取代文字' },
        { id: 'email', name: '信箱提取', icon: '📧', href: 'email.html', desc: '從文字中提取信箱與暱稱' },
        { id: 'word-replace', name: 'Word 批次取代', icon: '📃', href: 'word-replace.html', desc: 'Word/docx 文件批次取代' },
    ],
    image: [
        { id: 'pdf-to-png', name: 'PDF 轉 PNG', icon: '📄', href: 'pdf-to-png.html', desc: '將 PDF 轉換為圖片' },
        { id: 'pdf-to-txt', name: 'PDF 轉 TXT', icon: '📄', href: 'pdf-to-txt.html', desc: '擷取 PDF 純文字內容' },
        { id: 'png-to-pdf', name: 'PNG 轉 PDF', icon: '🖼️', href: 'png-to-pdf.html', desc: '將多張圖片合併為 PDF' },
        { id: 'resize-image', name: '縮小圖片', icon: '📐', href: 'resize-image.html', desc: '調整圖片尺寸大小' },
        { id: 'card', name: '裁剪圖片', icon: '✂️', href: 'card.html', desc: '自動裁剪空白和水印' },
        { id: 'exif', name: 'EXIF 讀取', icon: '📷', href: 'exif.html', desc: '讀取照片 EXIF 資訊' },
        { id: 'image-to-base64', name: '圖片轉 Base64', icon: '🖼️', href: 'image-to-base64.html', desc: '圖片轉 Data URL（PNG/JPEG/WebP）' },
        { id: 'qr-generator', name: 'QR Code 產生器', icon: '▦', href: 'qr-generator.html', desc: '產生 QR Code，下載 PNG / SVG' },
    ],
    dev: [
        { id: 'json-formatter', name: 'JSON 格式化', icon: '{ }', href: 'json-formatter.html', desc: 'JSON 美化、壓縮、驗證、樹狀檢視' },
        { id: 'url-encode', name: 'URL 編解碼', icon: '🔗', href: 'url-encode.html', desc: 'URL Encode / Decode 與查詢字串拆解' },
        { id: 'jwt-decoder', name: 'JWT 解碼器', icon: '🔑', href: 'jwt-decoder.html', desc: 'JWT Token 解析 Header / Payload' },
        { id: 'bash', name: '終端指令提取', icon: '💻', href: 'bash.html', desc: '從終端輸出中提取指令' },
        { id: 'encry', name: '編碼/加解密', icon: '🔐', href: 'encry.html', desc: 'Base64、MD5、SHA、AES' },
        { id: 'html-to-markdown', name: 'HTML 轉 Markdown', icon: '📝', href: 'html-to-markdown.html', desc: '將 HTML 轉換為 Markdown' },
        { id: 'windows-to-wsl', name: 'Windows 轉 WSL', icon: '🪟', href: 'windows-to-wsl.html', desc: '路徑格式轉換' },
        { id: 'iso-diff', name: 'ISO 差異對照', icon: '📋', href: 'iso-diff-tool.html', desc: 'ISO 文件版本比對' },
        { id: 'gsheet-to-markdown', name: 'Google Sheet 轉 Markdown', icon: '📊', href: 'gsheet-to-markdown.html', desc: '試算表轉 Markdown 表格' },
        { id: 'markdown-viewer', name: 'Markdown 預覽', icon: '📖', href: 'markdown-viewer.html', desc: 'Markdown 即時預覽' },
    ],
    life: [
        { id: 'tarot', name: '星辰塔羅', icon: '🔮', href: 'tarot.html', desc: '線上塔羅占卜，多種牌陣' },
    ]
};

// 取得所有工具的扁平列表
function getAllTools() {
    return [...TOOLS.text, ...TOOLS.image, ...TOOLS.dev, ...TOOLS.life];
}

// 根據 ID 或 href 找工具
function findTool(identifier) {
    const all = getAllTools();
    return all.find(t => t.id === identifier || t.href === identifier);
}

// 判斷工具類別
function getToolCategory(identifier) {
    if (TOOLS.text.some(t => t.id === identifier || t.href === identifier)) return 'text';
    if (TOOLS.image.some(t => t.id === identifier || t.href === identifier)) return 'image';
    if (TOOLS.dev.some(t => t.id === identifier || t.href === identifier)) return 'dev';
    return null;
}

// ========== 主題管理 ==========
function initTheme() {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (saved === 'dark' || (!saved && prefersDark)) {
        document.documentElement.classList.add('dark');
    }
}

function toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    return isDark;
}

function isDarkMode() {
    return document.documentElement.classList.contains('dark');
}

// ========== SVG 圖示 ==========
const ICONS = {
    home: `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/></svg>`,
    text: `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd"/></svg>`,
    image: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>`,
    dev: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>`,
    sun: `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"/></svg>`,
    moon: `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/></svg>`,
    arrow: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>`,
};

// ========== Desktop Header ==========
function injectDesktopHeader(options = {}) {
    const { currentPage = '', showBreadcrumb = true } = options;

    const header = document.createElement('header');
    header.id = 'desktop-header';
    header.className = 'hidden md:block sticky top-0 z-40 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700';

    header.innerHTML = `
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
                <!-- Logo -->
                <a href="index.html" class="flex items-center gap-2 min-h-[44px] min-w-[44px]" aria-label="返回首頁">
                    <span class="text-2xl" aria-hidden="true">${SITE_CONFIG.logo}</span>
                    <span class="font-bold text-xl text-gray-900 dark:text-white">${SITE_CONFIG.name}</span>
                </a>

                <!-- Breadcrumb / Nav -->
                <nav class="flex items-center gap-1" aria-label="導覽">
                    <a href="index.html" class="px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm min-h-[44px] flex items-center">
                        首頁
                    </a>
                    ${showBreadcrumb && currentPage ? `
                        <span class="text-gray-300 dark:text-gray-600">/</span>
                        <span class="px-3 py-2 text-gray-900 dark:text-white font-medium text-sm">${currentPage}</span>
                    ` : ''}
                </nav>

                <!-- Theme Toggle -->
                <button id="theme-toggle-desktop"
                        class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                        aria-label="切換深色模式">
                    <span class="hidden dark:block text-yellow-400">${ICONS.sun}</span>
                    <span class="block dark:hidden text-gray-600">${ICONS.moon}</span>
                </button>
            </div>
        </div>
    `;

    document.body.insertBefore(header, document.body.firstChild);
}

// ========== Mobile Bottom Navigation ==========
function injectMobileNav(options = {}) {
    const { currentCategory = '' } = options;

    const nav = document.createElement('nav');
    nav.id = 'mobile-nav';
    nav.className = 'md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700';
    nav.style.paddingBottom = 'env(safe-area-inset-bottom, 0)';
    nav.setAttribute('aria-label', '行動版導覽');

    const isHome = currentCategory === 'home';
    const isText = currentCategory === 'text';
    const isImage = currentCategory === 'image';
    const isDev = currentCategory === 'dev';

    const activeClass = 'text-blue-600 dark:text-blue-400';
    const inactiveClass = 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400';

    nav.innerHTML = `
        <div class="grid grid-cols-5 h-16">
            <a href="index.html" class="flex flex-col items-center justify-center min-h-[44px] ${isHome ? activeClass : inactiveClass} transition-colors" aria-label="首頁">
                ${ICONS.home}
                <span class="text-xs mt-0.5 ${isHome ? 'font-medium' : ''}">首頁</span>
            </a>
            <a href="text-stats.html" class="flex flex-col items-center justify-center min-h-[44px] ${isText ? activeClass : inactiveClass} transition-colors" aria-label="文字工具">
                ${ICONS.text}
                <span class="text-xs mt-0.5 ${isText ? 'font-medium' : ''}">文字</span>
            </a>
            <a href="pdf-to-png.html" class="flex flex-col items-center justify-center min-h-[44px] ${isImage ? activeClass : inactiveClass} transition-colors" aria-label="圖片工具">
                ${ICONS.image}
                <span class="text-xs mt-0.5 ${isImage ? 'font-medium' : ''}">圖片</span>
            </a>
            <a href="encry.html" class="flex flex-col items-center justify-center min-h-[44px] ${isDev ? activeClass : inactiveClass} transition-colors" aria-label="開發工具">
                ${ICONS.dev}
                <span class="text-xs mt-0.5 ${isDev ? 'font-medium' : ''}">開發</span>
            </a>
            <button id="theme-toggle-mobile" class="flex flex-col items-center justify-center min-h-[44px] ${inactiveClass} transition-colors" aria-label="切換主題">
                <span class="hidden dark:block">${ICONS.sun}</span>
                <span class="block dark:hidden">${ICONS.moon}</span>
                <span class="text-xs mt-0.5">主題</span>
            </button>
        </div>
    `;

    document.body.appendChild(nav);
}

// ========== Toast 通知 ==========
function injectToast() {
    if (document.getElementById('feifei-toast')) return;

    const toast = document.createElement('div');
    toast.id = 'feifei-toast';
    toast.className = 'fixed bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-4 py-2 rounded-lg shadow-lg transform transition-all duration-300 opacity-0 translate-y-4 pointer-events-none z-[60]';
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'polite');
    toast.innerHTML = '<span id="feifei-toast-message"></span>';

    document.body.appendChild(toast);
}

function showToast(message, duration = 2000) {
    const toast = document.getElementById('feifei-toast');
    if (!toast) {
        injectToast();
        return showToast(message, duration);
    }

    const msgEl = document.getElementById('feifei-toast-message');
    if (msgEl) msgEl.textContent = message;

    toast.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
    toast.classList.add('opacity-100', 'translate-y-0');

    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
        toast.classList.remove('opacity-100', 'translate-y-0');
    }, duration);
}

// ========== Skip Link ==========
function injectSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-lg z-[100]';
    skipLink.textContent = '跳至主要內容';

    document.body.insertBefore(skipLink, document.body.firstChild);
}

// ========== 主內容區底部間距 ==========
function adjustMainPadding() {
    const main = document.querySelector('main') || document.getElementById('main-content');
    if (main) {
        main.classList.add('pb-20', 'md:pb-8');
    }
}

// ========== 綁定事件 ==========
function bindEvents() {
    // 主題切換
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('#theme-toggle-desktop, #theme-toggle-mobile');
        if (btn) {
            toggleTheme();
        }
    });
}

// ========== 複製到剪貼簿 ==========
async function copyToClipboard(text, successMsg = '已複製到剪貼簿') {
    try {
        await navigator.clipboard.writeText(text);
        showToast(successMsg);
        return true;
    } catch (err) {
        showToast('複製失敗，請手動複製');
        return false;
    }
}

// ========== 初始化 ==========
function init(options = {}) {
    const {
        currentPage = '',
        currentCategory = '',
        showHeader = true,
        showNav = true,
        showSkipLink = true
    } = options;

    // 主題
    initTheme();

    // 注入元件
    if (showSkipLink) injectSkipLink();
    if (showHeader) injectDesktopHeader({ currentPage });
    if (showNav) injectMobileNav({ currentCategory });
    injectToast();

    // 調整間距
    adjustMainPadding();

    // 綁定事件
    bindEvents();
}

// ========== 匯出 ==========
window.FeiFeiTools = {
    // 初始化
    init,

    // 主題
    initTheme,
    toggleTheme,
    isDarkMode,

    // Toast
    showToast,

    // 複製
    copyToClipboard,

    // 資料
    SITE_CONFIG,
    TOOLS,
    getAllTools,
    findTool,
    getToolCategory,

    // 圖示
    ICONS,
};
