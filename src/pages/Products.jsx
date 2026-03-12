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

const cathegory = [
  "Makanan",
  "Minuman",
  "Perawatan",
]

const data = [
  {
    id: "1",
    name: 'Golda Coffee',
    cathegory: "Minuman",
    price: 45000,
    img_url: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//105/MTA-82914477/golda_minuman-kopi-golda-200ml-capucino_full01.jpg'
  },
  {
    id: "2",
    name: 'Chiki Rasa Jagung Bakar',
    cathegory: "Makanan",
    price: 3000,
    img_url: 'https://smexpo.pertamina.com/data-smexpo/images/products/2587/2022072013350426323_1715080717.jpeg'
  },
  {
    id: "3",
    name: 'LifeBuoy Sabun Mandi',
    cathegory: "Perawatan",
    price: 10000,
    img_url: 'data:image/jpeg;base64,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'
  },
]

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
    <div className='absolute inset-0 backdrop-blur bg-gray-200/60' onClick={onClose}>
      <Card className={`w-80 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 shadow-md`}>
        <CardHeader>
          <div className='w-full flex justify-between'>
            <CardTitle>Tambahkan Produk Baru</CardTitle>
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
                          <DropdownMenuItem key={index} onClick={() => setSelectedCathegory(item)}>{item}</DropdownMenuItem>
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
    <div className='absolute inset-0 backdrop-blur bg-gray-200/60' onClick={onClose}>
      <Card className={`w-80 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 shadow-md`}>
        <CardHeader>
          <div className='w-full flex justify-between'>
            <CardTitle>Tambahkan Kategori Baru</CardTitle>
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
    data: cathegory,
    default: 'Semua'
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Manajemen Produk</h1>
        </div>
        
        <div className='flex gap-2'>
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