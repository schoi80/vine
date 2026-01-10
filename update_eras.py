import re
import sys

def update_eras(content):
    # Regex to find titleKr: '...' and replace it with translations block
    # Matches: titleKr: 'Value',
    # Replaces with: translations: [{ language: 'ko', field: 'title', text: 'Value' }],
    
    pattern = r"titleKr:\s*'([^']*)',"
    replacement = r"translations: [{ language: 'ko', field: 'title', text: '\1' }],"
    
    return re.sub(pattern, replacement, content)

if __name__ == "__main__":
    file_path = sys.argv[1]
    with open(file_path, 'r') as f:
        content = f.read()
    
    new_content = update_eras(content)
    
    with open(file_path, 'w') as f:
        f.write(new_content)
