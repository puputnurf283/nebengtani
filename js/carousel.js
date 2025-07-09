// Change Main Image in Detail Page
function changeMainImage(thumbnail) {
    const mainImage = document.getElementById('main-image');
    mainImage.src = thumbnail.src;
    
    // Update active state
    const thumbnails = document.querySelectorAll('.cursor-pointer');
    thumbnails.forEach(t => {
        t.classList.remove('border-primary-500');
        t.classList.add('border-transparent');
    });
    
    thumbnail.parentElement.classList.remove('border-transparent');
    thumbnail.parentElement.classList.add('border-primary-500');
}

// Initialize first thumbnail as active
document.addEventListener('DOMContentLoaded', () => {
    const firstThumbnail = document.querySelector('.cursor-pointer');
    if (firstThumbnail) {
        firstThumbnail.classList.remove('border-transparent');
        firstThumbnail.classList.add('border-primary-500');
    }
});