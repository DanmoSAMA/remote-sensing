import { request } from '../request'

export async function searchProjects(keyword: string) {
  const res = await request({
    method: 'GET',
    url: `/v1/project?keyword=${keyword}`
  })

  return res
}

export async function searchProjectsInBin(keyword: string) {
  const res = await request({
    method: 'GET',
    url: `/v1/project/recycle?keyword=${keyword}`
  })

  return res
}
