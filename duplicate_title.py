import os
import glob
import re

pages_dir = "/Users/ariel/Developer/next-tutor/site/src/pages/features"

for html_file in glob.glob(os.path.join(pages_dir, "*", "index.html")):
    with open(html_file, 'r') as f:
        content = f.read()
    
    # Check if already processed
    if 'mobile-only' in content:
        continue
        
    # Find the main-title
    # It looks like:
    #         <div class="main-title">
    #           <div class="title"><strong class="gradient">...</strong>...</div>
    #         </div>
    match = re.search(r'(\s*)<div class="main-title">(.*?)</div>\n\s*</div>', content, flags=re.DOTALL)
    if match:
        indent = match.group(1)
        inner_content = match.group(2)
        full_original = match.group(0)
        
        # We want to replace the original with <div class="main-title desktop-only">...
        new_original = full_original.replace('<div class="main-title">', '<div class="main-title desktop-only">')
        
        # We want to create the mobile-only version
        mobile_title = f'\n    <div class="main-title mobile-only">{inner_content}</div>\n    </div>\n'
        
        # Insert the mobile_title right before `<div class="feature-opening">`
        content = content.replace('<div class="feature-opening">', mobile_title + '    <div class="feature-opening">')
        
        # Replace the original with the desktop-only version
        content = content.replace(full_original, new_original)
        
        with open(html_file, 'w') as f:
            f.write(content)

