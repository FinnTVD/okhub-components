"use client";

import { useEffect } from "react";
import { initSearch } from "./search-item";

export default function SearchItem() {
    // useEffect(() => {
    //     const wrapperSearch = document.querySelectorAll(".list-item-search");
    //     wrapperSearch.forEach((element) => {
    //         const inputSearch = element.querySelector("#input-search");
    //         const listItem = element.querySelectorAll(".box-list__item");
    //         const noResultsMessage = element.querySelector(
    //             ".no-results-message"
    //         );

    //         let searchTimeout: NodeJS.Timeout;

    //         inputSearch?.addEventListener("input", function () {
    //             clearTimeout(searchTimeout);

    //             searchTimeout = setTimeout(() => {
    //                 const searchTerm = (
    //                     inputSearch as HTMLInputElement
    //                 ).value.trim();
    //                 let hasResults = false;

    //                 listItem.forEach((item) => {
    //                     const elText = item.querySelector(".item-search__text");
    //                     const originalText = elText?.textContent;

    //                     if (searchTerm !== "") {
    //                         const searchTermNoAccent = searchTerm
    //                             .normalize("NFD")
    //                             .replace(/[\u0300-\u036f]/g, "");
    //                         const originalTextNoAccent = originalText
    //                             ?.normalize("NFD")
    //                             .replace(/[\u0300-\u036f]/g, "");

    //                         const regex = new RegExp(
    //                             `(${searchTermNoAccent})`,
    //                             "i"
    //                         );

    //                         if (regex.test(originalTextNoAccent ?? "")) {
    //                             (item as HTMLElement).style.display = "flex";
    //                             hasResults = true;

    //                             const match =
    //                                 originalTextNoAccent?.match(regex);
    //                             if (match) {
    //                                 const matchIndex = match.index;
    //                                 const matchLength = match[0].length;

    //                                 const beforeMatch = originalText?.substring(
    //                                     0,
    //                                     matchIndex
    //                                 );
    //                                 const matchedPart = originalText?.substring(
    //                                     matchIndex ?? 0,
    //                                     (matchIndex ?? 0) + matchLength
    //                                 );
    //                                 const afterMatch = originalText?.substring(
    //                                     (matchIndex ?? 0) + matchLength
    //                                 );

    //                                 const highlightedText =
    //                                     beforeMatch +
    //                                     `<mark>${matchedPart}</mark>` +
    //                                     afterMatch;
    //                                 elText!.innerHTML = highlightedText;
    //                             }
    //                         } else {
    //                             (item as HTMLElement).style.display = "none";
    //                             elText!.innerHTML = originalText ?? "";
    //                         }
    //                     } else {
    //                         (item as HTMLElement).style.display = "flex";
    //                         elText!.innerHTML = originalText ?? "";
    //                         hasResults = true;
    //                     }

    //                     item.addEventListener("click", () => {
    //                         (inputSearch as HTMLInputElement).value = "";
    //                         listItem.forEach((item) => {
    //                             const elText =
    //                                 item.querySelector(".item-search__text");
    //                             (item as HTMLElement).style.display = "flex";
    //                             elText!.innerHTML = elText!.textContent ?? "";
    //                         });
    //                     });
    //                 });

    //                 if (searchTerm !== "" && !hasResults) {
    //                     (noResultsMessage as HTMLElement).style.display =
    //                         "block";
    //                 } else {
    //                     (noResultsMessage as HTMLElement).style.display =
    //                         "none";
    //                 }
    //             }, 500);
    //         });

    //         document.addEventListener("click", function (e) {
    //             const target = e.target as HTMLElement;
    //             if (
    //                 !target?.closest?.(".list-item-search") &&
    //                 noResultsMessage
    //             ) {
    //                 (inputSearch as HTMLInputElement).value = "";
    //                 listItem.forEach((item) => {
    //                     const elText = item.querySelector(".item-search__text");
    //                     (item as HTMLElement).style.display = "flex";
    //                     elText!.innerHTML = elText!.textContent ?? "";
    //                 });
    //                 (noResultsMessage as HTMLElement).style.display = "none";
    //             }
    //         });
    //     });
    // }, []);
    useEffect(() => {
        initSearch();
    }, []);
    return (
        <div className="w-full p-[2rem]">
            <style>{`
        .label-search {
          margin-bottom: 2rem;
        }
        .box-list__container {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          min-width: 50rem;
        }
        .box-list__item {
          display: flex;
          align-items: center;
          padding: 0.5rem;
          cursor: pointer;
          border-radius: 0.5rem;
          border: 1px solid #000;
        }
        .box-list__input {
          width: 100%;
          height: 3rem;
          border: 1px solid #000;
          border-radius: 0.5rem;
          padding: 0.5rem;
          font-size: 1.25rem;
          font-weight: 600;
        }
        .no-results-message {
          display: none;
          font-size: 1.25rem;
          font-weight: 600;
          color: #000;
        }
        mark {
          background-color: yellow;
          padding: 0.1rem 0.2rem;
          border-radius: 0.2rem;
        }
      `}</style>
            <p className="label-search">Search Item</p>
            <div className="box-list__container list-item-search">
                <input
                    type="text"
                    id="input-search"
                    className="box-list__input"
                    placeholder="Search"
                />
                {[
                    "Hà Nội",
                    "Hồ Chí Minh",
                    "Đà Nẵng",
                    "Hải Phòng",
                    "Cần Thơ",
                    "An Giang",
                    "Bà Rịa - Vũng Tàu",
                    "Bắc Giang",
                    "Bắc Kạn",
                    "Bạc Liêu",
                    "Bạc Liêu vip",
                ].map((name) => (
                    <div className="box-list__item" key={name}>
                        <p className="item-search__text">{name}</p>
                    </div>
                ))}
                <p className="no-results-message">Không có kết quả</p>
            </div>
        </div>
    );
}

export const SearchItemHtmlCode = `
<style>
        .label-search {
            margin-bottom: 2rem;
        }
        .box-list__container {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            min-width: 50rem;
        }
        .box-list__item {
            display: flex;
            align-items: center;
            padding: 0.5rem;
            cursor: pointer;
            border-radius: 0.5rem;
            border: 1px solid #000;
        }
        .box-list__input {
            width: 100%;
            height: 3rem;
            border: 1px solid #000;
            border-radius: 0.5rem;
            padding: 0.5rem;
            font-size: 1.25rem;
            font-weight: 600;
        }
        .no-results-message {
            display: none;
            font-size: 1.25rem;
            font-weight: 600;
            color: #000;
        }
        mark {
            background-color: yellow;
            padding: 0.1rem 0.2rem;
            border-radius: 0.2rem;
        }
    </style>
     <p class="label-search">Search Item</p>
        <div class="box-list__container list-item-search">
            <input
                type="text"
                id="input-search"
                class="box-list__input"
                placeholder="Search"
            />
            <div class="box-list__item">
                <p class="item-search__text">Hà Nội</p>
            </div>
            <div class="box-list__item">
                <p class="item-search__text">Hồ Chí Minh</p>
            </div>
            <div class="box-list__item">
                <p class="item-search__text">Đà Nẵng</p>
            </div>
            <div class="box-list__item">
                <p class="item-search__text">Hải Phòng</p>
            </div>
            <div class="box-list__item">
                <p class="item-search__text">Cần Thơ</p>
            </div>
            <div class="box-list__item">
                <p class="item-search__text">An Giang</p>
            </div>
            <div class="box-list__item">
                <p class="item-search__text">Bà Rịa - Vũng Tàu</p>
            </div>
            <div class="box-list__item">
                <p class="item-search__text">Bắc Giang</p>
            </div>
            <div class="box-list__item">
                <p class="item-search__text">Bắc Kạn</p>
            </div>
            <div class="box-list__item">
                <p class="item-search__text">Bạc Liêu</p>
            </div>
            <div class="box-list__item">
                <p class="item-search__text">Bạc Liêu vip</p>
            </div>
            <p class="no-results-message">Không có kết quả</p>
        </div>
`;
export const SearchItemJsCode = `
<script>
        // Khởi tạo chức năng tìm kiếm cho tất cả các container search
        const wrapperSearch = document.querySelectorAll(".list-item-search");
        wrapperSearch.forEach((element) => {
            // Lấy các element cần thiết trong container hiện tại
            const inputSearch = element.querySelector("#input-search"); // Ô input tìm kiếm
            const listItem = element.querySelectorAll(".box-list__item"); // Danh sách các item
            const noResultsMessage = element.querySelector(".no-results-message"); // Thông báo không có kết quả

            // Biến để lưu timeout, tránh gọi hàm search quá nhiều lần
            let searchTimeout;

            // Lắng nghe sự kiện nhập liệu vào ô tìm kiếm
            inputSearch.addEventListener("input", function () {
                // Xóa timeout cũ nếu có
                clearTimeout(searchTimeout);

                // Tạo timeout mới để delay việc search (debounce)
                searchTimeout = setTimeout(() => {
                    const searchTerm = this.value.trim(); // Lấy từ khóa tìm kiếm và loại bỏ khoảng trắng
                    let hasResults = false; // Biến kiểm tra có kết quả hay không

                    // Duyệt qua từng item trong danh sách
                    listItem.forEach((item) => {
                        const elText = item.querySelector(".item-search__text"); // Text hiển thị của item
                        const originalText = elText.textContent; // Lưu text gốc để reset
                        if (searchTerm !== "") {
                            // Tạo regex để tìm kiếm không phân biệt hoa thường và không dấu
                            const searchTermNoAccent = searchTerm
                                .normalize("NFD")
                                .replace(/[\u0300-\u036f]/g, "");
                            const originalTextNoAccent = originalText
                                .normalize("NFD")
                                .replace(/[\u0300-\u036f]/g, "");

                            const regex = new RegExp(
                                \`(\${searchTermNoAccent})\`,
                                "i"
                            );

                            if (regex.test(originalTextNoAccent)) {
                                // Nếu tìm thấy kết quả
                                item.style.display = "flex"; // Hiển thị item
                                hasResults = true; // Đánh dấu có kết quả

                                // Tìm vị trí match trong text không dấu để highlight text gốc
                                const match = originalTextNoAccent.match(regex);
                                if (match) {
                                    // Lấy vị trí bắt đầu của văn bản khớp trong chuỗi gốc
                                    const matchIndex = match.index;
                                    // Lấy độ dài của văn bản khớp để xác định vị trí kết thúc
                                    const matchLength = match[0].length;

                                    // Tạo highlight cho text gốc tại vị trí tương ứng
                                    // Tách text thành 3 phần: trước match, phần match, và sau match
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

                                    // Ghép lại thành text hoàn chỉnh với highlight cho phần match
                                    const highlightedText =
                                        beforeMatch +
                                        \`<mark>\${matchedPart}</mark>\` +
                                        afterMatch;
                                    elText.innerHTML = highlightedText;
                                }
                            } else {
                                // Nếu không tìm thấy
                                item.style.display = "none"; // Ẩn item
                                elText.innerHTML = originalText; // Reset về text gốc
                            }
                        } else {
                            // Nếu ô tìm kiếm trống
                            item.style.display = "flex"; // Hiển thị tất cả item
                            elText.innerHTML = originalText; // Reset về text gốc (loại bỏ highlight)
                            hasResults = true; // Đánh dấu có kết quả
                        }
                        item.addEventListener("click", function () {
                            inputSearch.value = "";
                            listItem.forEach((item) => {
                                const elText =
                                    item.querySelector(".item-search__text");
                                item.style.display = "flex"; // Hiển thị tất cả item
                                elText.innerHTML = elText.textContent; // Loại bỏ highlight, trở về text gốc
                            });
                        });
                    });

                    // Hiển thị/ẩn thông báo "Không có kết quả"
                    if (searchTerm !== "" && !hasResults) {
                        // Nếu có từ khóa tìm kiếm nhưng không có kết quả
                        if (noResultsMessage) {
                            noResultsMessage.style.display = "block"; // Hiển thị thông báo
                        }
                    } else if (noResultsMessage) {
                        // Nếu không có từ khóa hoặc có kết quả
                        noResultsMessage.style.display = "none"; // Ẩn thông báo
                    }
                }, 500); // Delay 500ms trước khi thực hiện search
            });

            // Xử lý sự kiện click ra ngoài để reset form tìm kiếm
            document.addEventListener("click", function (e) {
                // Kiểm tra xem click có nằm ngoài container search không
                if (!e.target.closest(".list-item-search")) {
                    // Reset giá trị ô input về rỗng
                    inputSearch.value = "";

                    // Reset tất cả item trong container này về trạng thái ban đầu
                    listItem.forEach((item) => {
                        const elText = item.querySelector(".item-search__text");
                        item.style.display = "flex"; // Hiển thị tất cả item
                        elText.innerHTML = elText.textContent; // Loại bỏ highlight, trở về text gốc
                    });

                    // Ẩn thông báo "Không có kết quả"
                    if (noResultsMessage) {
                        noResultsMessage.style.display = "none";
                    }
                }
            });
        });
    </script>
`;
