hljs.highlightAll();

function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(text);
    }
    return new Promise((resolve, reject) => {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy') ? resolve() : reject(); }
        catch (e) { reject(e); }
        document.body.removeChild(ta);
    });
}

document.querySelectorAll('pre').forEach(pre => {
    const code = pre.querySelector('code');
    if (!code) return;
    const wrap = document.createElement('div');
    wrap.className = 'code-wrap';
    pre.parentNode.insertBefore(wrap, pre);
    wrap.appendChild(pre);
    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.type = 'button';
    btn.textContent = 'Copy';
    btn.addEventListener('click', () => {
        copyText(code.textContent).then(
            () => { btn.textContent = 'Copied'; },
            () => { btn.textContent = 'Failed'; }
        ).then(() => setTimeout(() => (btn.textContent = 'Copy'), 1500));
    });
    wrap.appendChild(btn);
});