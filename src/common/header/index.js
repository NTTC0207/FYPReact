import React ,{Component} from 'react';
import {HeaderWrapper,SearchInfoList,SearchInfoItem,SearchInfoSwitch,SearchInfoTitle,SearchInfo,Addition,Button,Logo,Nav,NavItem,SearchWrapper,NavSearch} from './style'
import { SearchOutlined  } from '@ant-design/icons';
import {CSSTransition} from 'react-transition-group'
import {connect} from 'react-redux'
import {actionCreators} from './store'
import{actionCreators as loginActionCreators} from '../../pages/login/store'


class Header extends Component {
    getListArea (){
        const {focused,list} = this.props;
        if(focused){
    return(
        <SearchInfo>
        <SearchInfoTitle>热门搜索
        <SearchInfoSwitch>换一批</SearchInfoSwitch>
        </SearchInfoTitle>
        <SearchInfoList>
            {
               list.map((item,index)=>{
                    return <SearchInfoItem key={item}>{item}</SearchInfoItem>
                })
        
            }
        </SearchInfoList>
        
    </SearchInfo>
    )
        }else{
            return null;
        }
    }
    render() {
        const {focused,handleInputBlur,handleInputFocus,handleMouseOver,handleMouseOut,list,login,logout,hover} =this.props;
        return (
            <div>
            <HeaderWrapper>
              
        
             <Logo href='/'>Hires</Logo>
 
        
              
          
            <Nav>
          
                <NavItem onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}  className='left' >Find Freelancer</NavItem>
            
                <NavItem className='left'>Post Job</NavItem>
     

                {
                    login ?  <NavItem onClick={logout}  className='right'>Logout</NavItem> :
                <NavItem  className='right'><span href="/login">Login</span></NavItem>
                
                }
              
                <NavItem className='right'>Aa</NavItem>
                <SearchWrapper>
            
                    <CSSTransition
                    timeout={200}
                    in={focused}
                    classNames="slide"
                    >
                    <NavSearch 
                    onBlur={handleInputBlur} 
                    onFocus={()=>handleInputFocus(list)} 
                    placeholder='Search' 
                    className={focused ? 'focused ' : ''}></NavSearch>
            </CSSTransition>
            <SearchOutlined className={focused ? 'focused iconfont' : "iconfont"}/>
                
        
                   {this.getListArea()}
                </SearchWrapper>
            </Nav>
            <Addition>
        
                <Button className='reg'>Order</Button>
              
                <Button className='writing'>Register</Button>
            </Addition>
            </HeaderWrapper>
                        </div>
        )
    }
}





const mapStateToProps=(state)=>{ //get fata 
    return{
    focused: state.getIn(['header','focused']), //immutableJS
    list : state.getIn(['header','list']),
    login:state.getIn(['login','login']),
    
    
    }
}

const mapDispatchToProps=(dispatch)=>{
    return {
   handleInputFocus(list){
     if(list.size === 0){
        dispatch(actionCreators.getList())
     }
 
  dispatch(actionCreators.searchFocus())
   },
   handleInputBlur(){
 const action =actionCreators.searchBlur()

 dispatch(action)
   },
   logout(){
       dispatch(loginActionCreators.logout())
   }
    }
}





export default connect(mapStateToProps,mapDispatchToProps)(Header);