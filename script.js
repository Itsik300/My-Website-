function getFaviconUrl(siteUrl) {
    const encodedUrl = encodeURIComponent(siteUrl);
    return `https://www.google.com/s2/favicons?domain_url=${encodedUrl}&sz=32`;
}

function addSiteIcon(link) {
    if (link.querySelector(".site-icon")) {
        return;
    }

    const icon = document.createElement("img");
    icon.className = "site-icon";
    icon.src = getFaviconUrl(link.href);
    icon.alt = "";
    icon.setAttribute("aria-hidden", "true");

    link.prepend(icon, " ");
}

function addIconsToLinks(root = document) {
    root.querySelectorAll("a.button[href], a.login-button[href]").forEach(addSiteIcon);
}

addIconsToLinks();

const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
            if (!(node instanceof Element)) {
                return;
            }

            if (node.matches("a.button[href], a.login-button[href]")) {
                addSiteIcon(node);
            }

            addIconsToLinks(node);
        });
    });
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});
