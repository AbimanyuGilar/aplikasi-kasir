import { 
  Search,
  Tag
} from 'lucide-react';

import { Card, CardAction, CardDescription, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SearchBar } from "@/components/ui/search-bar";
import products from '@/data/products';
import cathegoryData from '@/data/cathegory';
import { useState } from 'react';

const ProductCard = ({img_url, price, name}) => {
  return (
    <Card className='relative pt-0 shadow-sm'>
      <div className=''>
        <div className="absolute inset-0 z-10 aspect-video bg-black/35" />
        <img
          src={img_url}
          alt="Event cover"
          className="relative z-20 aspect-video w-full object-cover"
        />
      </div>
      <CardHeader placeholder="Cari Produk">
        <CardTitle className='text-xs flex flex-col gap-2'>
          <Badge variant="" className='text-xs'><Tag/>Rp{price}</Badge>
          <p>{name}</p>
        </CardTitle>
      </CardHeader>     
    </Card>
  )
}

const Home = () => {
  const [selectedCathegory, setSelectedCathegory] = useState(null)
  return (
    <>
      <header className='w-full flex flex-col gap-3'>
        <h1 className='font-bold text-2xl'>Tambah Transaksi</h1>
          <SearchBar placeholder="Cari produk..."/>
          <div className='flex gap-2 overflow-x-auto no-scrollbar'>
            <Badge variant={`${!selectedCathegory ? 'default': 'outline'}`} onClick={() => setSelectedCathegory(null)}>Semua</Badge>
            {cathegoryData.map((item, index) => (
              <Badge key={index} variant={`${selectedCathegory === item.name ? 'default' : 'outline'}`} onClick={() => setSelectedCathegory(item.name)}>{item.name}</Badge>
            ))}
          </div>
      </header>
      
      <div className='flex-1 overflow-y-auto no-scrollbar mt-3 px-1 py-1'>
        <div className='grid md:grid-cols-3 lg:grid-cols-4 grid-cols-2 gap-3 w-full'>
          {
            selectedCathegory 
            ? products.map((item, index) => {
              if (item.cathegory === selectedCathegory) {
                return <ProductCard key={index} img_url={item.img_url} price={item.price} name={item.name} />
              }
              return null
            })
            : products.map((item, index) => <ProductCard key={index} img_url={item.img_url} price={item.price} name={item.name} />)
          }
        </div>
      </div>
    </>
  );
};

export default Home;