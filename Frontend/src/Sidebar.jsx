import React from 'react'
import 
{BsCart3, BsGrid1X2Fill, BsFillArchiveFill,BsFillAwardFill, BsFillGrid3X3GapFill, BsPeopleFill, 
    BsFillPersonFill, BsFillGearFill,BsFillChatSquareFill}
 from 'react-icons/bs'

function Sidebar({openSidebarToggle, OpenSidebar}) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <BsFillPersonFill className='icon_header' style={{ color: 'white' }} /> 
                <span style={{ color: 'white' }}>USER</span>
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <a href="/">
                    <BsGrid1X2Fill className='icon'/> Dashboard
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/departments/list">
                    <BsFillArchiveFill className='icon'/> List Department
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/resources/list">
                    <BsFillGrid3X3GapFill className='icon'/> List Resources
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/about">
                    <BsPeopleFill className='icon'/> About Us
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/contact">
                    <BsFillChatSquareFill className='icon'/> Contact Us
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/revenue">
                    <BsFillAwardFill className='icon'/> Revenue
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/settings">
                    <BsFillGearFill className='icon'/> Setting
                </a>
            </li>
        </ul>
    </aside>
  )
}

export default Sidebar;
