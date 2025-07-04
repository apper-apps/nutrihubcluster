import mockProducts from '@/services/mockData/products.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const productService = {
  async getAll() {
    await delay(300)
    return [...mockProducts]
  },
  
  async getById(id) {
    await delay(200)
    const product = mockProducts.find(p => p.Id === id)
    if (!product) {
      throw new Error('Product not found')
    }
    return { ...product }
  },
  
  async create(product) {
    await delay(400)
    const newProduct = {
      ...product,
      Id: Math.max(...mockProducts.map(p => p.Id)) + 1
    }
    mockProducts.push(newProduct)
    return { ...newProduct }
  },
  
  async update(id, data) {
    await delay(300)
    const index = mockProducts.findIndex(p => p.Id === id)
    if (index === -1) {
      throw new Error('Product not found')
    }
    mockProducts[index] = { ...mockProducts[index], ...data }
    return { ...mockProducts[index] }
  },
  
  async delete(id) {
    await delay(300)
    const index = mockProducts.findIndex(p => p.Id === id)
    if (index === -1) {
      throw new Error('Product not found')
    }
    const deleted = mockProducts.splice(index, 1)[0]
    return { ...deleted }
  }
}