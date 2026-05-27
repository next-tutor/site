import os
import glob

pages_dir = "/Users/ariel/Developer/next-tutor/site/src/pages/features"

for html_file in glob.glob(os.path.join(pages_dir, "*", "index.html")):
    with open(html_file, 'r') as f:
        content = f.read()
    
    # Replace the footer mobile category divs with details/summary
    content = content.replace('<div class="category">', '<details class="category">')
    content = content.replace('</div>\n          <div class="content">', '</summary>\n          <div class="content">')
    content = content.replace('<div class="header">', '<summary class="header">')
    
    # We also need to close the details correctly.
    # The original ends with </div> for content, then </div> for category.
    # Now it should end with </details> for category.
    # So we replace '          </div>\n        </div>\n        <div class="mobile-apps">'
    # wait, there are 4 categories, the last one is followed by mobile-apps.
    
    with open(html_file, 'w') as f:
        f.write(content)
