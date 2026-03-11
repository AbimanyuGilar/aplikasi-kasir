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

const ProductCard = () => {
  return (
    <Card className='relative pt-0 shadow-sm'>
      <div className=''>
        <div className="absolute inset-0 z-10 aspect-video bg-black/35" />
        <img
          src="https://smexpo.pertamina.com/data-smexpo/images/products/2587/2022072013350426323_1715080717.jpeg"
          alt="Event cover"
          className="relative z-20 aspect-video w-full object-cover"
        />
      </div>
      <CardHeader placeholder="Cari Produk">
        <CardTitle className='text-xs flex flex-col gap-2'>
          <Badge variant="" className='text-xs'><Tag/> Rp3.000</Badge>
          <p>Chiki Rasa Jagung Bakar</p>
        </CardTitle>
      </CardHeader>     
    </Card>
  )
}

const Home = () => {
  return (
    <>
      <header className='w-full flex flex-col gap-3'>
        <h1 className='font-bold text-2xl'>Tambah Transaksi</h1>
          <SearchBar placeholder="Cari produk..."/>
          <div className='flex gap-2 overflow-x-auto no-scrollbar'>
            <Badge>Semua</Badge>
            <Badge variant='outline'>Makanan</Badge>
            <Badge variant='outline'>Minuman</Badge>
            <Badge variant='outline'>Mainan</Badge>
            <Badge variant='outline'>Perawatan</Badge>
            <Badge variant='outline'>Obat</Badge>
          </div>
      </header>
      
      <div className='flex-1 overflow-y-auto no-scrollbar mt-3 px-1 py-1'>
        <div className='grid md:grid-cols-3 grid-cols-2 gap-3 w-full'>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
    </>
  );
};

export default Home;