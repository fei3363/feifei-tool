import os
import re

def get_html_tools():
    """取得所有 HTML 工具檔案"""
    # 列出所有 .html 檔案，排除 index.html
    files = [f for f in os.listdir('.') if f.endswith('.html') and f != 'index.html']
    return sorted(files)

def get_tool_title(file_path):
    """從 HTML 文件中提取標題"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            # 嘗試從 title 標籤提取標題
            title_match = re.search(r'<title>(.*?)</title>', content)
            if title_match:
                return title_match.group(1)
            
            # 如果沒有找到 title，從檔名取得標題
            base_name = os.path.splitext(os.path.basename(file_path))[0]
            # 將連字符和下劃線轉換為空格並首字母大寫
            return base_name.replace('-', ' ').replace('_', ' ').title()
    except Exception as e:
        print(f"讀取 {file_path} 時出錯: {e}")
        # 回退到檔名
        return os.path.splitext(os.path.basename(file_path))[0]

def generate_toc(tools):
    """生成工具目錄的 HTML 內容"""
    toc = ""
    for tool in tools:
        title = get_tool_title(tool)
        toc += f'    <div class="tool-link">\n        <a class="ts-button" href="{tool}">{title}</a>\n    </div>\n'
    return toc

def update_index(toc_content):
    """更新 index.html 中的目錄部分"""
    # 讀取目前 index.html 內容
    with open("index.html", "r", encoding="utf-8") as f:
        content = f.read()

    # 查找目錄標記
    toc_pattern = r'<!--TOC_START-->(.*?)<!--TOC_END-->'
    if re.search(toc_pattern, content, re.DOTALL):
        # 替換目錄內容
        new_content = re.sub(toc_pattern, f'<!--TOC_START-->\n{toc_content}<!--TOC_END-->', content, flags=re.DOTALL)
        
        # 寫入新內容
        with open("index.html", "w", encoding="utf-8") as f:
            f.write(new_content)
        print("目錄已成功更新！")
    else:
        print("在 index.html 中找不到目錄標記 <!--TOC_START--> 和 <!--TOC_END-->")

if __name__ == "__main__":
    tools = get_html_tools()
    print(f"找到以下工具文件: {tools}")
    toc = generate_toc(tools)
    update_index(toc)
