import re
import sys

def update_content(content):
    # Define the translation block
    trans_block = 'translations(where: { language: { eq: "ko" } }) { language field text }'
    
    # 1. Remove specific Kr fields
    kr_fields = ['titleKr', 'bookNameKr', 'shortNameKr', 'mdTextKr']
    for field in kr_fields:
        content = re.sub(rf'\b{field}\b', '', content)
    
    # 2. Add translations to entities that usually have Kr fields
    # We look for common patterns like 'title', 'shortName', 'name', etc.
    
    # Pattern for book/testament/division/verse/event
    # This is tricky because we don't want to double-add.
    
    # Let's try to add translations after 'title', 'name', 'shortName', 'verseText', 'mdText'
    fields_to_follow = ['title', 'name', 'shortName', 'verseText', 'mdText']
    for field in fields_to_follow:
        # Avoid adding if already added in same scope (simple heuristic: look for 'translations' in next few chars)
        content = re.sub(rf'(\b{field}\b)(?![^{{]*translations)', rf'\1\n      {trans_block}', content)

    # Clean up empty lines created by removing fields
    content = re.sub(r'^\s*$\n', '', content, flags=re.MULTILINE)
    
    return content

if __name__ == "__main__":
    file_path = sys.argv[1]
    with open(file_path, 'r') as f:
        content = f.read()
    
    new_content = update_content(content)
    
    with open(file_path, 'w') as f:
        f.write(new_content)
