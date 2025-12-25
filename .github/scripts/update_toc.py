#!/usr/bin/env python3
"""
自動更新 index.html 的工具目錄
支援 Tailwind CSS 卡片式分類佈局
"""

import os
import re

# 工具分類設定 (檔名 -> 分類)
TOOL_CATEGORIES = {
    # 文字工具
    'text-stats.html': 'text',
    'chinese-conversion.html': 'text',
    'conversion.html': 'text',
    'pangu.html': 'text',
    'text-diff-tool.html': 'text',
    'highlight_replace.html': 'text',
    'email.html': 'text',

    # 圖片工具
    'pdf-to-png.html': 'image',
    'resize-image.html': 'image',
    'card.html': 'image',
    'exif.html': 'image',

    # 開發工具
    'bash.html': 'dev',
    'encry.html': 'dev',
    'html-to-markdown.html': 'dev',
    'windows-to-wsl.html': 'dev',
    'iso-diff-tool.html': 'dev',
}

# 工具圖示設定
TOOL_ICONS = {
    'text-stats.html': '🔢',
    'chinese-conversion.html': '🔄',
    'conversion.html': '🔄',
    'pangu.html': '📏',
    'text-diff-tool.html': '🔍',
    'highlight_replace.html': '🖍️',
    'email.html': '📧',
    'pdf-to-png.html': '📄',
    'resize-image.html': '📐',
    'card.html': '✂️',
    'exif.html': '📷',
    'bash.html': '💻',
    'encry.html': '🔐',
    'html-to-markdown.html': '📝',
    'windows-to-wsl.html': '🪟',
    'iso-diff-tool.html': '📋',
}

# 工具關鍵字 (用於搜尋)
TOOL_KEYWORDS = {
    'text-stats.html': '字數 統計 字元 詞數 行數 count',
    'chinese-conversion.html': '繁簡 轉換 簡體 繁體 中文 chinese',
    'conversion.html': '繁簡 轉換 格式 保留 html',
    'pangu.html': '盤古 空白 排版 中英文 pangu spacing',
    'text-diff-tool.html': '差異 比對 diff 比較 文字',
    'highlight_replace.html': '取代 替換 replace 識別 highlight',
    'email.html': '信箱 email 郵件 暱稱 提取 extract',
    'pdf-to-png.html': 'pdf png 轉換 圖片 convert',
    'resize-image.html': '縮小 圖片 resize 調整 尺寸 壓縮',
    'card.html': '裁剪 圖片 空白 水印 crop trim',
    'exif.html': 'exif 照片 資訊 相機 gps 元資料',
    'bash.html': '終端 指令 bash shell command terminal',
    'encry.html': '編碼 加密 解密 base64 md5 sha aes hash',
    'html-to-markdown.html': 'html markdown 轉換 convert md',
    'windows-to-wsl.html': 'windows wsl linux 路徑 轉換 path',
    'iso-diff-tool.html': 'iso 差異 比對 文件 版本',
}


def get_html_tools():
    """取得所有 HTML 工具檔案"""
    files = [f for f in os.listdir('.') if f.endswith('.html') and f != 'index.html']
    return sorted(files)


def get_tool_info(file_path):
    """從 HTML 文件中提取標題和描述"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

            # 提取標題 (從 <title> 或 <h1>)
            title = None
            title_match = re.search(r'<title>([^|<]+)', content)
            if title_match:
                title = title_match.group(1).strip()
                # 移除常見後綴
                title = re.sub(r'\s*[-–—]\s*.*$', '', title)
                title = re.sub(r'\s*\|\s*.*$', '', title)

            if not title:
                h1_match = re.search(r'<h1[^>]*>.*?([^<]+)</h1>', content, re.DOTALL)
                if h1_match:
                    title = re.sub(r'<[^>]+>', '', h1_match.group(0)).strip()

            if not title:
                base_name = os.path.splitext(os.path.basename(file_path))[0]
                title = base_name.replace('-', ' ').replace('_', ' ').title()

            # 提取描述 (從 meta description)
            desc = None
            desc_match = re.search(r'<meta\s+name=["\']description["\']\s+content=["\']([^"\']+)["\']', content, re.IGNORECASE)
            if not desc_match:
                desc_match = re.search(r'<meta\s+content=["\']([^"\']+)["\']\s+name=["\']description["\']', content, re.IGNORECASE)

            if desc_match:
                desc = desc_match.group(1).strip()
                # 截短過長的描述
                if len(desc) > 50:
                    desc = desc[:47] + '...'
            else:
                desc = '線上工具'

            return title, desc

    except Exception as e:
        print(f"讀取 {file_path} 時出錯: {e}")
        base_name = os.path.splitext(os.path.basename(file_path))[0]
        return base_name.replace('-', ' ').title(), '線上工具'


def generate_tool_card(file_name, title, desc):
    """生成單一工具卡片的 HTML"""
    icon = TOOL_ICONS.get(file_name, '🔧')
    keywords = TOOL_KEYWORDS.get(file_name, '')

    return f'''                    <a href="{file_name}" class="tool-card group block p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/10 transition-all touch-target" data-keywords="{keywords}">
                        <div class="flex items-start gap-3">
                            <span class="text-3xl flex-shrink-0" aria-hidden="true">{icon}</span>
                            <div class="flex-1 min-w-0">
                                <h3 class="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{title}</h3>
                                <p class="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{desc}</p>
                            </div>
                            <svg class="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                        </div>
                    </a>
'''


def generate_category_cards(tools, category):
    """生成特定分類的所有卡片"""
    cards = []
    for file_name in tools:
        if TOOL_CATEGORIES.get(file_name) == category:
            title, desc = get_tool_info(file_name)
            cards.append(generate_tool_card(file_name, title, desc))
    return '\n'.join(cards)


def update_index():
    """更新 index.html 中的目錄部分"""
    tools = get_html_tools()
    print(f"找到以下工具文件: {tools}")

    # 檢查是否有未分類的工具
    uncategorized = [t for t in tools if t not in TOOL_CATEGORIES]
    if uncategorized:
        print(f"警告：以下工具未分類，將不會顯示: {uncategorized}")

    # 讀取 index.html
    with open("index.html", "r", encoding="utf-8") as f:
        content = f.read()

    updated = False

    # 更新各分類
    categories = [
        ('text', '<!--TEXT_TOOLS_START-->', '<!--TEXT_TOOLS_END-->'),
        ('image', '<!--IMAGE_TOOLS_START-->', '<!--IMAGE_TOOLS_END-->'),
        ('dev', '<!--DEV_TOOLS_START-->', '<!--DEV_TOOLS_END-->'),
    ]

    for cat_name, start_marker, end_marker in categories:
        pattern = re.escape(start_marker) + r'(.*?)' + re.escape(end_marker)

        if re.search(pattern, content, re.DOTALL):
            cards = generate_category_cards(tools, cat_name)
            new_section = f'{start_marker}\n{cards}{end_marker}'
            content = re.sub(pattern, new_section, content, flags=re.DOTALL)
            updated = True
            print(f"已更新 {cat_name} 分類")
        else:
            print(f"找不到 {cat_name} 分類標記 ({start_marker} 和 {end_marker})")

    if updated:
        with open("index.html", "w", encoding="utf-8") as f:
            f.write(content)
        print("index.html 已成功更新！")
    else:
        print("沒有進行任何更新")


if __name__ == "__main__":
    update_index()
