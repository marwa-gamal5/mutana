
////////////////////// add product form validation //////////////////////
export default function Validation(values) {
    const errors = {}
    const productName_patternEN = /^(?=(?:\s*[a-zA-Z]){5})[a-zA-Z]+(?:\s+[a-zA-Z]+)*$/;
    const productName_patternٌِAR = /^(?=(?:\s*[\u0600-\u06FF]){5})[\u0600-\u06FF]+(?:\s+[\u0600-\u06FF]+)*$/;

    const ingredients_pattern = /^(?!\s)(?!.*\s$).{10,}$/;
    const ingredients_patternAR = /^(?!\s)(?!.*\s$)(?=(?:.*[\u0600-\u06FF]){10}).*[\u0600-\u06FF\s]+$/;

    const description_pattern = /^(?!\s)(?!.*\s$).{20,}$/;
    const description_patternAR = /^(?!\s)(?!.*\s$)(?=(?:.*[\u0600-\u06FF]){20}).*[\u0600-\u06FF\s]+$/;





    // product name
    if(values.productName === undefined){
     errors.productName = "p name required";
 }
    else if(values.productName === '') {
        errors.productName = "p name required";
            }else if(!productName_patternEN.test(values.productName)) {
        errors.productName = " not match";
    }
        // image
 if(values.mainImage === undefined){
     errors.mainImage = "image required"
 }else if(values.mainImage === '') {
     errors.mainImage = "image required";
 }
            // country
    if(values.country === undefined){
        errors.country = "country required"
    }else if(values.country === '') {
        errors.country = "country required";
    }

    // vendor
    if(values.vendorr === undefined){
        errors.vendorr = "vendor required"
    }else if(values.vendorr === '') {
        errors.vendorr = "vendor required";
    }

    // store
    if(values.storee === undefined){
        errors.storee = "store required"
    }else if(values.storee === '') {
        errors.storee = "store required";
    }
        // Category
    if(values.categoryy === undefined){
        errors.categoryy = "Category required"
    }else if(values.categoryy === '') {
        errors.categoryy = "Category required";
    }
    // sizeOrWeight
    if(values.sizeOrWeight === undefined){
        errors.sizeOrWeight = "sw required"
    }else if(values.sizeOrWeight === '') {
        errors.sizeOrWeight = "sw required";
    }

    // product name English
    if(values.productNameEN === undefined){
        errors.productNameEN = "EN p name required";
    }
    else if(values.productNameEN === '') {
        errors.productNameEN = "p name required";
    }else if(!productName_patternEN.test(values.productNameEN)) {
        errors.productNameEN = " not match";
    }

    // Ingredients EN
    if(values.ingredientsEN === undefined){
        errors.ingredientsEN = "ingredients EN required";
    }
    else if(values.ingredientsEN === '') {
        errors.ingredientsEN = "ingredients EN required";
    }else if(!ingredients_pattern.test(values.ingredientsEN)) {
        errors.ingredientsEN = " not match";
    }

    // HTU-EN
    if(values.HTU_EN === undefined){
        errors.HTU_EN = "HTU_EN  required";
    }
    else if(values.HTU_EN === '') {
        errors.HTU_EN = "HTU_EN  required";
    }else if(!ingredients_pattern.test(values.HTU_EN)) {
        errors.HTU_EN = " not match";

    }


    // benifitsEN
    if(values.benifitsEN === undefined){
        errors.benifitsEN = "benifitsEN  required";
    }
    else if(values.benifitsEN === '') {
        errors.benifitsEN = "benifitsEN  required";
    }else if(!ingredients_pattern.test(values.benifitsEN)) {
        errors.benifitsEN = " not match";
    }


    // descriptionEN

    if(values.descriptionEN === undefined){
        errors.descriptionEN = "descriptionEN  required";
    }
    else if(values.descriptionEN === '') {
        errors.descriptionEN = "descriptionEN  required";
    }else if(!description_pattern.test(values.descriptionEN)) {
        errors.descriptionEN = " not match";
    }

    // sORwNameEN
    if(values.sORwNameEN === undefined){
        errors.sORwNameEN = "sORwNameAR required"
    }else if(values.sORwNameEN === '') {
        errors.sORwNameEN = "sORwNameAR required";
    }else if(!productName_patternEN.test(values.sORwNameEN)) {
        errors.sORwNameEN = " not match";
    }




    ///// arabic

    // product name AR
    if(values.productNameAR === undefined){
        errors.productNameAR = "AR p name required";
    }
    else if(values.productNameAR === null) {
        errors.productName = "p name required";
    }else if(!productName_patternٌِAR.test(values.productNameAR)) {
        errors.productNameAR = " not match";
    }
// ingredients AR
    if(values.ingredientsAR === undefined){
        errors.ingredientsAR = "ingredients AR required";
    }
    else if(values.ingredientsAR === '') {
        errors.ingredientsAR = "ingredients AR required";
    }else if(!ingredients_patternAR.test(values.ingredientsAR)) {
        errors.ingredientsAR = " not match";
    }


    // HTU-AR
    if(values.HTU_AR === undefined){
        errors.HTU_AR = "HTU_AR required";
    }
    else if(values.HTU_AR === '') {
        errors.HTU_AR = "HTU_AR required";
    }else if(!ingredients_patternAR.test(values.HTU_AR)) {
        errors.HTU_AR = " not match";
    }

    // benifitsAR
    if(values.benifitsAR === undefined){
        errors.benifitsAR = "benifitsAR required";
    }
    else if(values.benifitsAR === '') {
        errors.benifitsAR = "benifitsAR required";
    }else if(!ingredients_patternAR.test(values.benifitsAR)) {
        errors.benifitsAR = " not match";
    }



    //// descriptionAR
    if(values.descriptionAR === undefined){
        errors.descriptionAR = "descriptionAR  required";
    }
    else if(values.descriptionAR === '') {
        errors.descriptionAR = "descriptionAR  required";
    }else if(!description_patternAR.test(values.descriptionAR)) {
        errors.descriptionAR = " not match";
    }

    // sORwNameAR
    if(values.sORwNameAR === undefined){
        errors.sORwNameAR = "sORwNameAR required"
    }else if(values.sORwNameAR === '') {
        errors.sORwNameAR = "sORwNameAR required";
    }else if(!productName_patternٌِAR.test(values.sORwNameAR)) {
        errors.sORwNameAR = " not match";
    }


///////////////////////////////

    // Size Or Weight Info

    // name
    if(values.sORwInfo === undefined){
        errors.sORwInfo = "sORwInfo name required";
    }
    else if(values.sORwInfo === '') {
        errors.sORwInfo = "sORwInfo name required";
    }else if(!productName_patternEN.test(values.sORwInfo)) {
        errors.sORwInfo = " not match";
    }


    // description
    if(values.description === undefined){
        errors.description = "description  required";
    }
    else if(values.description === '') {
        errors.description = "description  required";
    }else if(!description_pattern.test(values.description)) {
        errors.description = " not match";
    }

    // price
    if(values.price === undefined){
        errors.price = "price required"
    }else if(values.price === 0) {
        errors.price = "enter valid  price ";
    }else if(isNaN(values.price)) {
        errors.price = "price required ";
    }

    // global price
    if(values.globalPrice === undefined){
        errors.globalPrice = "global price required"
    }else if(values.globalPrice === 0) {
        errors.globalPrice = "enter valid global price ";
    }else if(isNaN(values.globalPrice)) {
        errors.globalPrice = "global price required ";
    }

    // value
    if(values.value === undefined){
        errors.value = " value required"
    }else if(isNaN(values.value)) {
        errors.value = "value required ";
    }else if(values.value === 0) {
        errors.value = "enter valid global value ";
    }

  // unit
    if(values.unit === undefined){
        errors.unit = " unit required"
    }else if(values.unit === '') {
        errors.unit = "unit required";
    }


  // Stock
    if(values.stock === undefined){
        errors.stock = " stock required"
    }else if(isNaN(values.stock)) {
        errors.stock = "stock required";
    }else if(values.stock === 0) {
        errors.stock = "enter valid stock required";
    }


  // maxOrder
    if(values.maxOrder === undefined){
        errors.maxOrder = " maxOrder required"
    }else if(isNaN(values.maxOrder)) {
        errors.maxOrder = "maxOrder required";
    }else if(values.maxOrder === 0) {
        errors.maxOrder = "enter valid maxOrder ";
    }else if(values.maxOrder > values.stock) {
        errors.maxOrder = "max order more than stock ";
    }

    // img
    if(values.img === undefined){
        errors.img = "img required"
    }else if(values.img === '') {
        errors.img = "img required";
    }

    // imgList
  if(values.imgList === undefined){
        errors.imgList = "imgList required"
    }else if(values.imgList === '') {
        errors.imgList = "imgList required";
    }


    return errors;
}









////////////////////// add vendor form validation //////////////////////
export  function VendorValidation(vendorValues) {
    const arabic_Pattern = /^[\u0600-\u06FF]+(?:\s[\u0600-\u06FF]+)*$/;


    const vendorName_pattern = /^(?=(?:\s*[a-zA-Z]){5})[a-zA-Z]+(?:\s+[a-zA-Z]+)*$/;
    const vendorName_patternAR = /^(?=(?:\s*[\u0600-\u06FF]){5})[\u0600-\u06FF]+(?:\s+[\u0600-\u06FF]+)*$/;
    const vendorDescription_pattern = /^(?!\s)(?!.*\s$).{20,}$/;
    const description_patternAR = /^(?!\s)(?!.*\s$)(?=(?:.*[\u0600-\u06FF]){20}).*[\u0600-\u06FF\s]+$/;

    const vendorErrors = {}
    // vendor name
    if(vendorValues.vendorName === undefined){
        vendorErrors.vendorName = "vendorName required"
    }else if(vendorValues.vendorName === '') {
        vendorErrors.vendorName = "vendorName required";


    }else if(!vendorName_pattern.test(vendorValues.vendorName)) {
        vendorErrors.vendorName = "not match";

    }

   //vendor description

    if(vendorValues.vendorDescription === undefined){
        vendorErrors.vendorDescription = "vendorDescreption required";

    }else if(vendorValues.vendorDescription === '') {
        vendorErrors.vendorDescription = "vendorDescreption required";

    }else if(!vendorDescription_pattern.test(vendorValues.vendorDescription)) {
        vendorErrors.vendorDescription = "not match";

    }

   //vendor address
    if(vendorValues.vendorAddress === undefined){
        vendorErrors.vendorAddress = "vendorAddress required";

    }else if(vendorValues.vendorAddress === '') {
        vendorErrors.vendorAddress = "vendorAddress required";

    }

    //// AR ////
    // vendor name AR
    if(vendorValues.vendorNameAR === undefined){
        vendorErrors.vendorNameAR = "vendorNameAR required"
    }else if(vendorValues.vendorNameAR === '') {
        vendorErrors.vendorNameAR = "vendorNameAR required";

    }else if(!vendorName_patternAR.test(vendorValues.vendorNameAR)) {
        vendorErrors.vendorNameAR = "not match";

    }


  // vendorAddressAR AR
    if(vendorValues.vendorAddressAR === undefined){
        vendorErrors.vendorAddressAR = "vendorAddressAR required"
    }else if(vendorValues.vendorAddressAR === '') {
        vendorErrors.vendorAddressAR = "vendorAddressAR required";
    }else if(!arabic_Pattern.test(vendorValues.vendorAddressAR)){
        vendorErrors.vendorAddressAR = "vendorAddressAR not match";
    }

// vendorDescriptionAR AR
    if(vendorValues.vendorDescriptionAR === undefined){
        vendorErrors.vendorDescriptionAR = "vendorDescriptionAR required"
    }else if(vendorValues.vendorDescriptionAR === '') {
        vendorErrors.vendorDescriptionAR = "vendorDescriptionAR required";

    }else if(!description_patternAR.test(vendorValues.vendorDescriptionAR)) {
        vendorErrors.vendorDescriptionAR = "not match";

    }



    //// EN ////
    // vendor name EN
    if(vendorValues.vendorNameEN === undefined){
        vendorErrors.vendorNameEN = "vendorNameEN required"
    }else if(vendorValues.vendorNameEN === '') {
        vendorErrors.vendorNameEN = "vendorNameEN required";


    }else if(!vendorName_pattern.test(vendorValues.vendorNameEN)) {
        vendorErrors.vendorNameEN = "not match";

    }

  // vendor address EN
    if(vendorValues.vendorAddressEN === undefined){
        vendorErrors.vendorAddressEN = "vendorAddressEN required"
    }else if(vendorValues.vendorAddressEN === '') {
        vendorErrors.vendorAddressEN = "vendorAddressEN required";


    }


    //vendorDescriptionEN

    if(vendorValues.vendorDescriptionEN === undefined){
        vendorErrors.vendorDescriptionEN = "vendorDescriptionEN required";

    }else if(vendorValues.vendorDescriptionEN === '') {
        vendorErrors.vendorDescriptionEN = "vendorDescriptionEN required";

    }else if(!vendorDescription_pattern.test(vendorValues.vendorDescriptionEN)) {
        vendorErrors.vendorDescriptionEN = "not match";

    }




    return vendorErrors;

}










// const theValue = e.target.value
// const   theName = e.target.name
// handleInput(theName,theValue)
// {errors.productName && <p style={{color:'red'}}>{errors.productName}</p>}



// const theValue = e.target.value
// if(langDir=='rtl'){
//     var  theName = "productNameAR"
// }else{
//     theName="productNameEN"
// }
//
// handleInput(theName,theValue)


// {langDir=='rtl'&& errors.productNameAR && <p style={{color:'red'}}>{errors.productNameAR}</p>}
// {langDir=='ltr'&& errors.productNameEN && <p style={{color:'red'}}>{errors.productNameEN}</p>}