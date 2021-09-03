import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRouter } from "next/dist/client/router";
import { format } from "date-fns";
import InfoCard from "../components/InfoCard";

function search({searchResults}) {
    const router = useRouter();
    // console.log(searchResults)
    const{location,startDate,endDate,noOfGuests} = router.query;
    const formattedStartDate = format(new Date(startDate),"dd MM yyyy");
    const formattendDate = format(new Date(endDate),"dd MM yyyy");
    const range = `${formattedStartDate} - ${formattendDate}`

    return (
        <div>
           <Header placeholder={`${location} | ${range} | ${noOfGuests} guests`}/>
           <main className="flex">
               <section className="flex-grow pt-14 px-6">
                   <p className="text-xs">300+ Stays  {range}  for {noOfGuests} of guests</p>
                   <h1 className="text-3xl font-semibold mt-2 mb-6">Stays in {location}</h1>
                   <div className="hidden lg:inline-flex mb-5 skew-x-3 text-gray-800 whitespace-nowrap">
                       <p className="button">Cancellation Flexibility</p>
                       <p className="button">Types of Places</p>
                       <p className="button">Price</p>
                       <p className="button">Rooms and Beds</p>
                       <p className="button">More filters</p>
                   </div>
                   <div className="flex flex-col">
                   {searchResults.map(({img,location,title,description,star,price,total}) =>(
                       <InfoCard 
                       key={img}
                       img={img}
                       location={location}
                       title={title}
                       description={description}
                       star={star}
                       price={price}
                       total={total}
                       />
                   ))}
                   </div>
               </section>
           </main>
           <Footer/>
        </div>
    )
}

export default search
export async function getServerSideProps(){
    const searchResults = await fetch("https://links.papareact.com/isz").then(res=>res.json());

    return {
        props:{
            searchResults,
        }
    }
}
