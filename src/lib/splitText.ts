/**
 * Character/Word/Line SplitText utility matching the extracted GSAP SplitText behavior
 * Preserves the target element (tag, classes, font styling) and wraps internal text in word and char spans.
 */
export class SplitText {
  elements: HTMLElement[];
  chars: HTMLElement[] = [];
  words: HTMLElement[] = [];
  private originalContent: { el: HTMLElement; html: string; ariaLabel: string | null }[] = [];

  constructor(
    target: string | HTMLElement | HTMLElement[] | NodeListOf<HTMLElement>,
    options?: { type?: string; wordsClass?: string; charsClass?: string }
  ) {
    if (typeof target === "string") {
      this.elements = Array.from(document.querySelectorAll(target));
    } else if (target instanceof HTMLElement) {
      this.elements = [target];
    } else {
      this.elements = Array.from(target as HTMLElement[]);
    }

    this.split(options);
  }

  static create(
    target: string | HTMLElement | HTMLElement[] | NodeListOf<HTMLElement>,
    options?: { type?: string; wordsClass?: string; charsClass?: string }
  ) {
    return new SplitText(target, options);
  }

  split(options?: { type?: string; wordsClass?: string; charsClass?: string }) {
    this.revert();
    const wordsClass = options?.wordsClass || "word";
    const charsClass = options?.charsClass || "char";

    this.elements.forEach((el) => {
      const originalText = el.textContent || "";
      this.originalContent.push({
        el,
        html: el.innerHTML,
        ariaLabel: el.getAttribute("aria-label"),
      });

      el.setAttribute("aria-label", originalText);
      el.innerHTML = "";

      // Split text into words (preserving spaces)
      const rawWords = originalText.trim().split(/\s+/);
      const wordsArr: HTMLElement[] = [];
      const charsArr: HTMLElement[] = [];

      rawWords.forEach((wordText, wIdx) => {
        const wordSpan = document.createElement("span");
        wordSpan.className = `${wordsClass} inline-block relative`;
        wordSpan.setAttribute("aria-hidden", "true");
        wordSpan.setAttribute("aria-label", wordText);
        wordSpan.style.fontFamily = "inherit";
        wordSpan.style.fontSize = "inherit";
        wordSpan.style.fontWeight = "inherit";
        wordSpan.style.textTransform = "inherit";
        wordSpan.style.letterSpacing = "inherit";

        const charList = Array.from(wordText);
        charList.forEach((char) => {
          const charSpan = document.createElement("span");
          charSpan.className = `${charsClass} inline-block relative`;
          charSpan.setAttribute("aria-hidden", "true");
          charSpan.style.fontFamily = "inherit";
          charSpan.style.fontSize = "inherit";
          charSpan.style.fontWeight = "inherit";
          charSpan.style.textTransform = "inherit";
          charSpan.style.letterSpacing = "inherit";
          charSpan.textContent = char;
          wordSpan.appendChild(charSpan);
          charsArr.push(charSpan);
        });

        el.appendChild(wordSpan);
        wordsArr.push(wordSpan);

        // Add space between words
        if (wIdx < rawWords.length - 1) {
          el.appendChild(document.createTextNode(" "));
        }
      });

      this.words.push(...wordsArr);
      this.chars.push(...charsArr);
    });

    return this;
  }

  revert() {
    this.originalContent.forEach(({ el, html, ariaLabel }) => {
      el.innerHTML = html;
      if (ariaLabel) {
        el.setAttribute("aria-label", ariaLabel);
      } else {
        el.removeAttribute("aria-label");
      }
    });
    this.chars = [];
    this.words = [];
    this.originalContent = [];
  }
}
