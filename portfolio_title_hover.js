import gsap from 'https://cdn.skypack.dev/gsap';
import SplitType from 'https://cdn.skypack.dev/split-type';

document.addEventListener('DOMContentLoaded', () => {
    // Create the gsap.matchMedia() instance
    let mm = gsap.matchMedia();

    // Add a media query that targets screens with a minimum width of 992px
    mm.add('(min-width: 992px', () => {
        const fontWeightItems = document.querySelectorAll(
            '[data-animate="font-weight"]'
        );
        const MAX_DISTANCE = 300;
        const MAX_FONT_WEIGHT = 800;
        const MIN_FONT_WEIGHT = 100;

        // Split up any text with the data attribute
        fontWeightItems.forEach((item) => {
            new SplitType(item, { types: 'chars' }).chars;
        });

        document.addEventListener('mousemove', (event) => {
            // Get the mouse position
            const mouseX = event.pageX;
            const mouseY = event.pageY;

            fontWeightItems.forEach((item) => {
                item.querySelectorAll('.char').forEach((char) => {
                    const itemRect = char.getBoundingClientRect();
                    const itemCenterX = itemRect.left + itemRect.width / 2 + window.scrollX;
                    const itemCenterY = itemRect.top + itemRect.height / 2 + window.scrollY;

                    const distance = Math.sqrt(
                        Math.pow(mouseX - itemCenterX, 2) + Math.pow(mouseY - itemCenterY, 2)
                    );

                    // map the distance to the font weight range
                    let fontWeight = distance < MAX_DISTANCE ? gsap.utils.mapRange(
                        0,
                        MAX_DISTANCE,
                        MIN_FONT_WEIGHT,
                        MAX_FONT_WEIGHT,
                        Math.max(0, MAX_DISTANCE - distance)
                    ) : MIN_FONT_WEIGHT;

                    gsap.to(char, { fontWeight, duration: 0.5 });
                });
            });
        });
    });
});