const photoInput = document.getElementById('land-photos');
const previewContainer = document.getElementById('preview-container');

if (photoInput && previewContainer) {
    photoInput.addEventListener('change', function() {
        previewContainer.innerHTML = '';
        
        if (this.files) {
            Array.from(this.files).forEach(file => {
                if (file.size > 5 * 1024 * 1024) {
                    alert('File terlalu besar. Maksimal 5MB per gambar.');
                    return;
                }
                
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    const previewDiv = document.createElement('div');
                    previewDiv.className = 'relative';
                    
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.className = 'w-full h-24 object-cover rounded-lg';
                    
                    const removeBtn = document.createElement('button');
                    removeBtn.className = 'absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center';
                    removeBtn.innerHTML = '<i class="fas fa-times text-xs"></i>';
                    removeBtn.onclick = function() {
                        previewDiv.remove();
                    };
                    
                    previewDiv.appendChild(img);
                    previewDiv.appendChild(removeBtn);
                    previewContainer.appendChild(previewDiv);
                }
                
                reader.readAsDataURL(file);
            });
        }
    });
}

// Price Formatting
const priceInputs = document.querySelectorAll('input[type="text"][placeholder*="500000"]');
priceInputs.forEach(input => {
    input.addEventListener('blur', function() {
        const value = this.value.replace(/\D/g, '');
        if (value) {
            this.value = parseInt(value).toLocaleString('id-ID');
        }
    });
    
    input.addEventListener('focus', function() {
        this.value = this.value.replace(/\D/g, '');
    });
});