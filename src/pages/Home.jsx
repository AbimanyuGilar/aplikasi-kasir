import { 
  Search,
  Tag,
  Trash,
  Plus,
  Minus
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
import { useEffect, useState } from 'react';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"

const ProductCard = ({img_url, price, name, id, isSelected, ...props}) => {
  return (
    <Card {...props} className={`${isSelected && 'border-2  border-black'} pt-0 shadow-sm group-data-[state=on]/toggle:scale-150`}>
      <div className='relative border-solid border-b'>
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

const Drawer = ({newOrder, setNewOrder}) => {
  return (
    <div className='rounded-t-2xl p-5 border-2 -mx-5 md:mx-0 bg-sidebar-accent gap-3 flex flex-col items-center pb-15'>
      <div className='max-h-40 overflow-auto flex flex-col gap-2 w-full'>
        {newOrder.map(order => (
          <Item key={order.productId} variant='outline' className='h-20 w-full'>
            <ItemMedia className='h-full'>
              <img className='h-1/2 aspect-square rounded-md object-cover' src={products.find(product => product.id === order.productId).img_url} alt="" />
            </ItemMedia>
            <ItemContent>
              <ItemTitle className='text-xs'>{products.find(product => product.id === order.productId).name}</ItemTitle>
              <ItemDescription className='text-xs'>
                {products.find(product => product.id === order.productId).price}
              </ItemDescription>
            </ItemContent>
            <ItemActions className='gap-1'>
              {
                order.amount > 1 
                ? <Button onClick={() => setNewOrder(prev => prev.map(item => item.productId === order.productId ? {...item, amount: item.amount - 1} : item))}><Minus /></Button> 
                : <Button variant='outline'><Minus/></Button>
              }
              
              <div>{order.amount}</div>
              <Button onClick={() => setNewOrder(prev => prev.map(item => item.productId === order.productId ? {...item, amount: item.amount + 1} : item))}><Plus/></Button>
              <Button onClick={() => setNewOrder(prev => prev.filter(item => item.productId !== order.productId))} variant='destructive'><Trash/></Button>
            </ItemActions>
          </Item>
        ))}
      </div>
      <div className='h-15 flex flex-col justify-center gap-2 w-full'>
        <Button className='w-full py-4'>Selesaikan Pesanan</Button>
        <Button onClick={() => setNewOrder([])} className='w-full' variant='outline'>Batalkan Pesanan</Button>
      </div>
    </div>
  )
}

const Home = () => {
  const [selectedCathegory, setSelectedCathegory] = useState(null)
  const [searchInput, setSearchInput] = useState(null)
  const [newOrder, setNewOrder] = useState([])
  
  function handleAddOrder(productId) {
    const isExist = newOrder.some(order => order.productId == productId)
    !isExist
    ? setNewOrder(
      prev => [
        ...prev, 
        {
          productId: productId,
          amount: 1
        }
      ]
    )
    : setNewOrder(prev => prev.filter(order => order.productId != productId))
  }
  
  return (
    <>
      <header className='w-full flex flex-col gap-3'>
        <h1 className='font-bold text-2xl'>Tambah Transaksi</h1>
          <SearchBar placeholder="Cari produk..." onChange={(e) => setSearchInput(e.target.value)}/>
          <div className='flex gap-2 overflow-x-auto no-scrollbar'>
            <Badge className={`cursor-pointer`} variant={`${!selectedCathegory ? 'default': 'outline'}`} onClick={() => setSelectedCathegory(null)}>Semua</Badge>
            {cathegoryData.map((item, index) => (
              <Badge className={`cursor-pointer`} key={index} variant={`${selectedCathegory === item.name ? 'default' : 'outline'}`} onClick={() => setSelectedCathegory(item.name)}>{item.name}</Badge>
            ))}
          </div>
      </header>
      
      <div className='flex-1 overflow-y-auto no-scrollbar mt-3 px-1 py-1'>
        <div className='grid md:grid-cols-3 lg:grid-cols-4 grid-cols-2 gap-3 w-full'>
          {
            products.filter((item) => {
              const matchCategory = !selectedCathegory || item.cathegory === selectedCathegory;
              const matchSearch = !searchInput || item.name.toLowerCase().includes(searchInput.toLowerCase());
              return matchCategory && matchSearch;
            }).map((item, index) => (
              <ProductCard
                isSelected={newOrder.some(order => order.productId == item.id)}
                onClick={() => handleAddOrder(item.id)}
                key={index} 
                img_url={item.img_url} 
                price={item.price} 
                name={item.name}
              />
            ))
          }
        </div>
      </div>

      {newOrder.length > 0 && <Drawer newOrder={newOrder} setNewOrder={setNewOrder} />}
    </>
  );
};

export default Home;