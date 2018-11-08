function calculateDate(data){
        const monthSize = [
            31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
        ];
        let month = Number(data.substring(0, 2));
        let day = Number(data.substring(2, 4));
        let total = 0;
        for(let i = 0; i < month - 1; i++)
            total += monthSize[i];

        return total + day;
    }

module.exports = {
  calculateDate : calculateDate
}
