import React from 'react'
import "./EmployeeSummary.scss"
import { AiFillDollarCircle } from 'react-icons/ai'
import { BsCart4, BsCartX } from 'react-icons/bs'
import { BiCategory } from 'react-icons/bi'
import InfoBox from '../../infoBox/InfoBox'
// import { useDispatch, useSelector } from 'react-redux'
// import { CALC_OUTOFSTOCK,
//          CALC_STORE_VALUE,
//          CALC_CATEGORY,
//          selectCategory,
//          selectOutOfStock,
//          selectTotalStoreValue 
//        } from '../../../redux/features/product/productSlice';
//Icons 
const earningIcon = <AiFillDollarCircle size = {40} color = '#fff'/>
const employeeIcon= <BsCart4 size = {40} color = '#fff'/>
const categoryIcon= <BiCategory size = {40} color = '#fff'/>
const outOfStockIcon= <BsCartX size = {40} color = '#fff'/>


//Format Amount
export const formatNumbers = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
}

const EmployeeSummary = ({employees}) => {
  // const dispatch = useDispatch();
  // const totalStoreValue = useSelector(selectTotalStoreValue)
  // const outOfStock = useSelector(selectOutOfStock)
  // const categories = useSelector(selectCategory)

  // useEffect(() => {
  //   dispatch(CALC_STORE_VALUE(products));
  //   dispatch(CALC_OUTOFSTOCK(products));
  //   dispatch(CALC_CATEGORY(products))
  // },[dispatch,employees])

  return (
    <div className='product-summary'>
      <h2>Employee Stats</h2>
      <div className='info-summary'>
        <InfoBox icon = {employeeIcon} title = {'Total Products'} count = {employees.length} bgColor = 'card1'/>
        <InfoBox icon = {earningIcon} title = {'Total Store Value'} count = {8} bgColor = 'card2'/>
        <InfoBox icon = {outOfStockIcon } title = {'Out of stock'} count = {9} bgColor = 'card3'/>
        <InfoBox icon = {categoryIcon} title = {'All categories'} count = {9} bgColor = 'card4'/>
        {/* <InfoBox icon = {earningIcon} title = {'Total Store Value'} count = {`$${formatNumbers(totalStoreValue.toFixed(2))}`} bgColor = 'card2'/>
        <InfoBox icon = {outOfStockIcon } title = {'Out of stock'} count = {outOfStock} bgColor = 'card3'/>
        <InfoBox icon = {categoryIcon} title = {'All categories'} count = {categories.length} bgColor = 'card4'/> */}

      </div>
    </div>
  )
}

export default EmployeeSummary