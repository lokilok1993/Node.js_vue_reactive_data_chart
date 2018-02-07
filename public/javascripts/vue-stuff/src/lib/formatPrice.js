function formatPrice (data){
    var price       = Number.prototype.toFixed.call(parseFloat(data)),
        //заменяем точку на запятую
        price_sep   = price.replace(/(\D)/g, ","),
        //добавляем пробел как разделитель в целых
        price_sep   = price_sep.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

    return price_sep + ' р';
};



module.exports = formatPrice;