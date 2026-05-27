import os
import re

# Get all webp paths
img_dir = "src/assets/images"
webp_files = set()
for root, dirs, files in os.walk(img_dir):
    for f in files:
        if f.endswith('.webp'):
            webp_files.add(os.path.relpath(os.path.join(root, f), img_dir))

src_dir = "src"
files_changed = 0

for root, dirs, files in os.walk(src_dir):
    for f in files:
        if f.endswith(('.html', '.css', '.js', '.jsx', '.ts', '.tsx')):
            filepath = os.path.join(root, f)
            with open(filepath, 'r') as file:
                content = file.read()
            
            new_content = content
            for webp_rel in webp_files:
                png_path = webp_rel.replace('.webp', '.png')
                jpg_path = webp_rel.replace('.webp', '.jpg')
                jpeg_path = webp_rel.replace('.webp', '.jpeg')
                
                # Check for exact matches in paths
                new_content = new_content.replace(png_path, webp_rel)
                new_content = new_content.replace(jpg_path, webp_rel)
                new_content = new_content.replace(jpeg_path, webp_rel)
            
            if new_content != content:
                with open(filepath, 'w') as file:
                    file.write(new_content)
                files_changed += 1

print(f"Updated {files_changed} files to use .webp")
