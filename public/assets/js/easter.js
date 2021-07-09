let date = new Date();
console.log(date.getMonth(), date.getDate())
if (date.getMonth() == 6 && date.getDate() == 16) {
    setInterval(() => {
        party.confetti(document.getElementById('body'), {
            count: party.variation.range(25, 75),
        });
    }, 1000)
}