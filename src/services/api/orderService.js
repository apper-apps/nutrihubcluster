import mockOrders from '@/services/mockData/orders.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const orderService = {
  async getAll() {
    await delay(300)
    return [...mockOrders]
  },
  
  async getById(id) {
    await delay(200)
    const order = mockOrders.find(o => o.Id === id)
    if (!order) {
      throw new Error('Order not found')
    }
    return { ...order }
  },
  
  async create(order) {
    await delay(500)
    const newOrder = {
      ...order,
      Id: Math.max(...mockOrders.map(o => o.Id)) + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    mockOrders.push(newOrder)
    return { ...newOrder }
  },
  
  async update(id, data) {
    await delay(300)
    const index = mockOrders.findIndex(o => o.Id === id)
    if (index === -1) {
      throw new Error('Order not found')
    }
    mockOrders[index] = { 
      ...mockOrders[index], 
      ...data,
      updatedAt: new Date().toISOString()
    }
    return { ...mockOrders[index] }
  },
  
  async delete(id) {
    await delay(300)
    const index = mockOrders.findIndex(o => o.Id === id)
    if (index === -1) {
      throw new Error('Order not found')
    }
    const deleted = mockOrders.splice(index, 1)[0]
    return { ...deleted }
  }
}