
// import React from 'react'
// import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
// import { Avatar, AvatarImage } from '../ui/avatar'
// import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
// import { Edit2, MoreHorizontal } from 'lucide-react'



// const CompaniesTable = () => {
//   return (
//     <div>
//       <Table>
//         <TableCaption>A list of your recent registered companies</TableCaption>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Logo</TableHead>
//             <TableHead>Name</TableHead>
//             <TableHead>Date</TableHead>
//             <TableHead className="text-right">Action</TableHead>
//           </TableRow>
//         </TableHeader>

//         <TableBody>
//          <TableRow>

//           <TableCell>
//             <Avatar>
//               <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" />
//             </Avatar>
//           </TableCell>

//            <TableCell>Company Name</TableCell>  
//            <TableCell>15-05-2025</TableCell>  

//            <TableCell className="text-right cursor-pointer">
//             <Popover>
//               <PopoverTrigger><MoreHorizontal/></PopoverTrigger>
//               <PopoverContent className="w-32">
//                 <div className='flex items-center gap-2 w-fit cursor-pointer'>
//                   <Edit2 className='w-4'/>
//                   <span>Edit</span>
//                 </div>
//               </PopoverContent>
//             </Popover>
//             </TableCell>  



//           </TableRow>
//         </TableBody>
//       </Table>
//     </div>
//   )
// }

// export default CompaniesTable



                                                                /* Now Dynamically */

// Abb ham issa dynamically dekha raha ha. Ki frontend pa show kasa karna ha companies ko
import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const CompaniesTable = () => {
    const {companies,searchCompanyByText} = useSelector(store => store.company);
    const navigate =useNavigate();

 //For filtering the companies:-
 const[filterCompany,setFilterCompany]=useState(companies);

 useEffect(()=>{
           const filteredCompany =companies.length >= 0 && companies.filter((company)=>{
            if(!searchCompanyByText){
                return true;
            }

            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
           });

           setFilterCompany(filteredCompany);
 },[companies,searchCompanyByText])



    return (
        <div>
            <Table>
                <TableCaption>A list of your recent registered companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>



                <TableBody>
                    {
                        // companies?.map((company) => (  //Ya ham jab use kar raha tha jab hamna filterCompany ko ni bnaya tha 

                        filterCompany?.map((company) => (    
                            <tr>
                                <TableCell>
                                    <Avatar>
                                        <AvatarImage src={company.logo} />
                                    </Avatar>
                                </TableCell>

                                <TableCell>{company.name}</TableCell>
                                <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            <div onClick={()=> navigate(`/admin/companies/${company._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                <Edit2 className='w-4' />
                                                <span>Edit</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </tr>
                        ))
                    }

                </TableBody>
            </Table>
        </div>
    )
}

export default CompaniesTable