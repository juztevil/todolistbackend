const getDate = (code) => {
    let retDate="";
    let year=new Date().getFullYear();
    let month=new Date().getMonth();
    let todaydate=new Date().getDate();
    switch(code){
        case 'today':
            retDate=year+"-"+(month+1)+"-"+todaydate;
        break;
        case 'yesterday':
            let date=new Date(year,month,todaydate-1);
            retDate = (date.getFullYear())+"-"+(date.getMonth()+1)+"-"+(date.getDate());
        break;
        default:
    }
    return retDate;
};

module.exports={getDate};