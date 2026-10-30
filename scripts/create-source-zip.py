import os
import zipfile

def create_source_zip():
    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
    output_zip_root = os.path.join(base_dir, 'Clean_and_Earn_Source_Code.zip')
    output_zip_public = os.path.join(base_dir, 'public', 'Clean_and_Earn_Source_Code.zip')

    # Folders and files to exclude
    exclude_dirs = {
        'node_modules',
        '.next',
        '.git',
        '.turbo',
        '.vercel'
    }
    exclude_files = {
        'Clean_and_Earn_Source_Code.zip',
    }

    print(f"Creating source code zip from {base_dir}...")
    
    with zipfile.ZipFile(output_zip_root, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(base_dir):
            # Exclude unwanted directories
            dirs[:] = [d for d in dirs if d not in exclude_dirs and not d.startswith('.git')]
            
            for file in files:
                if file in exclude_files:
                    continue
                file_path = os.path.join(root, file)
                rel_path = os.path.relpath(file_path, base_dir)
                
                # Exclude any nested public zip
                if rel_path.endswith('Clean_and_Earn_Source_Code.zip'):
                    continue
                
                zipf.write(file_path, rel_path)
                
    print(f"Zip created at: {output_zip_root} ({os.path.getsize(output_zip_root)} bytes)")

    # Copy to public folder
    os.makedirs(os.path.join(base_dir, 'public'), exist_ok=True)
    import shutil
    shutil.copy2(output_zip_root, output_zip_public)
    print(f"Copied to: {output_zip_public}")

if __name__ == '__main__':
    create_source_zip()
