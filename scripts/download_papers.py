import sys
import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
import os

def download_papers(keyword):
    # 设置 Chrome 选项
    chrome_options = Options()
    
    # 设置下载路径为当前项目的 public 目录
    download_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'public')
    prefs = {
        "download.default_directory": download_path,
        "download.prompt_for_download": False
    }
    chrome_options.add_experimental_option("prefs", prefs)

    # 初始化 Chrome WebDriver with automatic ChromeDriver management
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=chrome_options)
    
    try:
        # 访问网页
        url = f"https://pasa-agent.ai/home?query={keyword}"
        driver.get(url)
        
        # 等待查询结果加载完成（等待第一个结果出现）
        wait = WebDriverWait(driver, 60)
        wait.until(EC.presence_of_element_located((By.CLASS_NAME, "paper-item")))
        
        # 等待一下确保所有结果都加载完成
        time.sleep(60)
        
        # 点击 Select All 按钮
        select_all_button = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'Select all')]")))
        select_all_button.click()
        
        # 点击下载按钮
        download_button = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[@aria-label='download']")))
        download_button.click()
        
        # 选择 JSON 格式
        json_option = wait.until(EC.element_to_be_clickable((By.XPATH, "//div[text()='JSON']")))
        json_option.click()
        
        # 等待下载完成
        time.sleep(15)
        
        print(f"下载完成！文件保存在: {download_path}")
        
    except TimeoutException:
        print("操作超时，请检查网络连接或网页是否正常加载")
    except Exception as e:
        print(f"发生错误: {str(e)}")
    finally:
        # 关闭浏览器
        driver.quit()

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("使用方法: python download_papers.py <关键字>")
        sys.exit(1)
    
    keyword = sys.argv[1]
    download_papers(keyword)