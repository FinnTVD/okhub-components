export function initSearch() {
    const wrapperSearch = document.querySelectorAll(".list-item-search");

    wrapperSearch.forEach((element) => {
        const inputSearch = element.querySelector("#input-search");
        const listItem = element.querySelectorAll(".box-list__item");
        const noResultsMessage = element.querySelector(".no-results-message");
        let searchTimeout;

        inputSearch?.addEventListener("input", function () {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                const searchTerm = this.value.trim();
                let hasResults = false;

                listItem.forEach((item) => {
                    const elText = item.querySelector(".item-search__text");
                    const originalText = elText.textContent;

                    if (searchTerm !== "") {
                        const searchTermNoAccent = searchTerm
                            .normalize("NFD")
                            .replace(/[\u0300-\u036f]/g, "");
                        const originalTextNoAccent = originalText
                            .normalize("NFD")
                            .replace(/[\u0300-\u036f]/g, "");
                        const regex = new RegExp(
                            `(${searchTermNoAccent})`,
                            "i"
                        );

                        if (regex.test(originalTextNoAccent)) {
                            item.style.display = "flex";
                            hasResults = true;
                            const match = originalTextNoAccent.match(regex);
                            if (match) {
                                const matchIndex = match.index;
                                const matchLength = match[0].length;
                                const beforeMatch = originalText.substring(
                                    0,
                                    matchIndex
                                );
                                const matchedPart = originalText.substring(
                                    matchIndex,
                                    matchIndex + matchLength
                                );
                                const afterMatch = originalText.substring(
                                    matchIndex + matchLength
                                );
                                elText.innerHTML =
                                    beforeMatch +
                                    `<mark>${matchedPart}</mark>` +
                                    afterMatch;
                            }
                        } else {
                            item.style.display = "none";
                            elText.innerHTML = originalText;
                        }
                    } else {
                        item.style.display = "flex";
                        elText.innerHTML = originalText;
                        hasResults = true;
                    }

                    item.addEventListener("click", () => {
                        inputSearch.value = "";
                        listItem.forEach((item) => {
                            const elText =
                                item.querySelector(".item-search__text");
                            item.style.display = "flex";
                            elText.innerHTML = elText.textContent;
                        });
                    });
                });

                if (searchTerm !== "" && !hasResults) {
                    noResultsMessage.style.display = "block";
                } else {
                    noResultsMessage.style.display = "none";
                }
            }, 500);
        });

        document.addEventListener("click", function (e) {
            if (!e.target.closest(".list-item-search")) {
                inputSearch.value = "";
                listItem.forEach((item) => {
                    const elText = item.querySelector(".item-search__text");
                    item.style.display = "flex";
                    elText.innerHTML = elText.textContent;
                });
                noResultsMessage.style.display = "none";
            }
        });
    });
}
