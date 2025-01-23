document.addEventListener('DOMContentLoaded', function() {
    // 缩略图切换
    const viewBtns = document.querySelectorAll('.view-btn');
    const mainImage = document.querySelector('.main-image img');

    viewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 更新主图
            const img = btn.querySelector('img');
            mainImage.src = img.src;
            // 更新激活状态
            viewBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // 颜色选择
    const colorBtns = document.querySelectorAll('.color-btn');
    colorBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const color = btn.dataset.color;
            // 更新主图和缩略图
            mainImage.src = `images/${color}/jacket-main.jpg`;

            viewBtns.forEach((btn, index) => {
                const views = ['front', 'back'];
                const img = btn.querySelector('img');
                img.src = `images/${color}/jacket-${views[index]}.jpg`;
            });
            
            // 更新激活状态
            colorBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // 尺码选择
    const sizeBtns = document.querySelectorAll('.size-btn');
    sizeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (!btn.classList.contains('disabled')) {
                sizeBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            }
        });
    });

    // 尺码指南
    const sizeChartBtn = document.querySelector('.size-chart-btn');
    sizeChartBtn.addEventListener('click', () => {
        // 这里可以添加显示尺码表的逻辑
        alert('尺码指南即将推出');
    });
}); 