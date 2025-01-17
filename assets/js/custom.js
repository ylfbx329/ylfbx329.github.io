document.addEventListener('selectionchange', () => {
    console.log('Selection changed'); // 调试日志

    // 移除之前的自定义选中元素
    const existing = document.querySelectorAll('.custom-selection');
    existing.forEach(el => {
        console.log('Removing existing custom-selection');
        el.remove();
    });

    const selection = window.getSelection();
    if (selection.rangeCount === 0) return;

    // 遍历所有选中的范围
    for (let i = 0; i < selection.rangeCount; i++) {
        const range = selection.getRangeAt(i);
        if (selection.isCollapsed) continue; // 没有选中内容

        const rects = range.getClientRects();
        for (let rect of rects) {
            console.log('Selection rect:', rect); // 调试日志

            const customDiv = document.createElement('div');
            customDiv.classList.add('custom-selection');
            customDiv.style.top = `${rect.top + window.scrollY - 2}px`;
            customDiv.style.left = `${rect.left + window.scrollX - 2}px`;
            customDiv.style.width = `${rect.width + 4}px`;
            customDiv.style.height = `${rect.height + 4}px`;

            document.body.appendChild(customDiv);
            console.log('Custom selection div added'); // 调试日志
        }
    }
});
