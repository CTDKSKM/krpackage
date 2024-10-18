import HomePage from '@/components/HomePage';
import { getProducts } from '@/utils/product';

const Page = async () => {
  const initialProducts = await getProducts();
  
  return <HomePage initialProducts={initialProducts} />;
}

export default Page;
