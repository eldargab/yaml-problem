import * as fs from 'fs'
import * as yaml from 'js-yaml'
import Joi from 'joi'


const File = Joi.object({
    kind: Joi.valid('file'),
    location: Joi.string().required().min(1)
})


const Directory = Joi.object({
    kind: Joi.valid('directory'),
    items: Joi.array().items(File, Joi.link('#D'))
}).id('D')


/**
 * This function has a bug. Do you see it?
 */
export function readFileSystem(file: string): any {
    let content = fs.readFileSync(file, 'utf-8')
    let obj = yaml.load(content)
    let {error, value} = Directory.validate(obj)
    if (error) throw error
    return value
}
