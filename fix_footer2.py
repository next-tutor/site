import os
import glob
import re

pages_dir = "/Users/ariel/Developer/next-tutor/site/src/pages/features"

for html_file in glob.glob(os.path.join(pages_dir, "*", "index.html")):
    with open(html_file, 'r') as f:
        content = f.read()
    
    # We have `<details class="category">` followed by `<summary class="header">`, then `</summary>`, then `<div class="content">`, then `</div>`, then `</div>` instead of `</details>`.
    # Let's fix the closing tags.
    # We can use regex.
    # Replace `</div>\n        </div>\n        <div class="category">` with `</div>\n        </details>\n        <details class="category">`
    # Actually, simpler:
    # Look for `<div class="content">`...`</div>`...`</div>`
    
    content = re.sub(r'(<div class="content">.*?</div>\n\s*)</div>', r'\1</details>', content, flags=re.DOTALL)
    
    with open(html_file, 'w') as f:
        f.write(content)
