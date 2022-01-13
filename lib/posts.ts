import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames.map(fileName => {
        const id = fileName.replace(/\.md$/, '')

        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf-8')

        const matterResult = matter(fileContents)

        return {
            id,
            ...matterResult.data as { date: string, title: string}
        }
    })

    // Sort posts by date
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1
        } else {
            return -1
        }
    })
}

export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory)
    return fileNames.map(fileName => {
        return {
            params: {
                id: fileName.replace(/\.md$/, '')
            }
        }
    })
}

export async function getPostData(id: string) {
    const fullPath = path.join(postsDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf-8')

    const matterResult = matter(fileContents)

    const processContent = await remark()
        .use(html)
        .process(matterResult.content)
    const contentHtml = processContent.toString()

    return {
        id,
        contentHtml,
        ...matterResult.data as { date: string, title: string}
    }
}

// export async function getSortedPostsData() {
//     const res = await fetch('..')
//     return res.json()
// }

// export async function getAllPostIds() {
//     const res = await fetch('..')
//     const posts = await res.json()
//     return posts.map(post => {
//         return {
//             params: {
//                 id: post.id
//             }
//         }
//     })
// }

// 파일 시스템에서 데이터를 가져오는 lib/posts.js