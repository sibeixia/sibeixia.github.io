document.addEventListener('DOMContentLoaded', function() {
    // 3D模型展示切换
    const productImage = document.querySelector('.product-image');
    const modelViewer = document.querySelector('.model-viewer-container');
    let showing3D = false;

    if (productImage && modelViewer) {
        productImage.addEventListener('click', () => {
            if (!showing3D) {
                productImage.style.display = 'none';
                modelViewer.style.display = 'block';
                showing3D = true;
            }
        });

        modelViewer.addEventListener('click', () => {
            if (showing3D) {
                modelViewer.style.display = 'none';
                productImage.style.display = 'block';
                showing3D = false;
            }
        });
    }
}); 