import { useState } from 'react'
import { 
  Image as DefaultImage,
  Trash2 as Trash,
  SquarePen as Edit,
  Plus,
  ChevronDown,
  X
} from 'lucide-react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import TableData from '@/components/ui/table-data'
import {Button} from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import products from '@/data/products'
import cathegoryData from '@/data/cathegory' 

const cathegory = cathegoryData

const data = products

const columns = [
  {
    accessorKey: "img_url",
    header: "Gambar",
    cell: ({row}) => {
      const imgUrl = row.getValue('img_url')

      return (
        <div className='h-10 w-10 rounded-md shadow flex items-center justify-center overflow-hidden'>
          {
            imgUrl
            ? <img src={imgUrl} className='h-full w-full object-cover' alt="" />
            : <DefaultImage className='text-muted' />
          }
        </div>
      )
    }
  },
  {
    accessorKey: "name",
    header: "Nama"
  },
  {
    accessorKey: "cathegory",
    header: "Kategori"
  },
  {
    accessorKey: "price",
    header: "Harga",
    short: true,
  },
  {
    header: "Aksi",
    cell: () => (
      <div className='flex gap-2'>
        <Edit className='scale-80 text-yellow-300' />
        <Trash className='scale-80 text-red-500' />
      </div>
    )
  },
]

function AddProductCard({onClose}) {
  const [selectedCathegory, setSelectedCathegory] = useState(null)
  console.log(selectedCathegory)
  return (
    <div className='absolute flex items-center justify-center inset-0 backdrop-blur bg-gray-200/60' onClick={onClose}>
      <Card onClick={(e) => e.stopPropagation()} className={`w-80 shadow-md`}>
        <CardHeader>
          <div className='w-full flex justify-between'>
            <CardTitle className={`text-xl font-bold`}>Tambahkan Produk Baru</CardTitle>
            <Button variant='ghost' onClick={onClose}>
              <X/>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form action="">
            <div className='flex flex-col gap-2'>
              <div className='grid gap-2'>
                <Label htmlFor="name">Nama Produk</Label>
                <div className='flex gap-2'>
                  <Input id="name" />
                  <div className='grid gap-2'>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant='outline' className={`group`}>
                          {selectedCathegory ?? 'Kategori'}
                          <ChevronDown className="transition duration-300 group-data-[state=open]:rotate-180"/>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {cathegory.map((item, index) => (
                          <DropdownMenuItem key={index} onClick={() => setSelectedCathegory(item.name)}>{item.name}</DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
              <div className='grid gap-2'>
                <Label htmlFor="price">Harga</Label>
                <Input id="price" type={`number`} />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className={`w-full`}>Tambah</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

function AddCathegoryCard({onClose}) {
  return (
    <div className='absolute flex items-center justify-center inset-0 backdrop-blur bg-gray-200/60' onClick={onClose}>
      <Card onClick={(e) => e.stopPropagation()} className={`w-80 shadow-md`}>
        <CardHeader>
          <div className='w-full flex justify-between'>
            <CardTitle className={`text-xl font-bold`}>Tambahkan Kategori Baru</CardTitle>
            <Button variant='ghost' onClick={onClose}>
              <X/>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form action="">
            <div className='flex flex-col gap-2'>
              <div className='grid gap-2'>
                <Label htmlFor="name">Nama Kategori</Label>
                <Input id="name" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className={`w-full`}>Tambah</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default function Products () {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [isAddCathegoryOpen, setIsAddCathegoryOpen] = useState(false)
  

  const filter = {
    title: 'Filter kategori', 
    column: 'cathegory', 
    data: cathegory.map((item) => item.name),
    default: 'Semua'
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Manajemen Produk</h1>
        </div>
        
        <div className='flex flex-col md:flex-row gap-2'>
          <Button className="flex gap-2" onClick={() => setIsAddProductOpen(true)}>
            <Plus className="h-4 w-4" />
            Produk
          </Button>
          <Button variant='outline' className="flex gap-2" onClick={() => setIsAddCathegoryOpen(true)}>
            <Plus className="h-4 w-4" />
            Kategori
          </Button>
        </div>
      </div>

      <TableData searchFilter='name' filter={filter} data={data} columns={columns} pageSize={5} />

      { isAddProductOpen && <AddProductCard onClose={() => setIsAddProductOpen(false)}/> }
      { isAddCathegoryOpen && <AddCathegoryCard onClose={() => setIsAddCathegoryOpen(false)}/> }
    </div>
  )
}