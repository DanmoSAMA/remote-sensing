import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import MySelect from './components/MySelect'
import TypeSelect from './components/TypeSelect'
import Loading from '../../../../../../components/Loading'
import { ProjectStore } from '../../../../../../mobx/project'
import { HeightStore } from '../../../../../../mobx/height'
import { mainStyles } from '../../styles'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { ObjectType } from '../../../../../../types/objectDetection/ObjectType'

function _Function() {
  const [isChecking, setIsChecking] = useState(false)
  const [targetName, setTargetName] = useState('')
  const [objectType, setObjectType] = useState<ObjectType>('')

  async function clickToDetect() {
    if (!ProjectStore.singleWaitingGroups.length) {
      alert('请先选择要分析的图片')
      return
    }
    if (objectType === '') {
      alert('请先选择要检测的对象类型')
      return
    }
    setIsChecking(true)

    ProjectStore.objectDetect(
      targetName === '' ? '未命名' : targetName,
      objectType
    ).then(() => {
      setIsChecking(false)
      ProjectStore.setShowPerspective(true)
    })
  }

  return (
    <Box
      sx={mainStyles.function}
      style={{ height: HeightStore.bodyHeight - 115 + 'px' }}
    >
      <Typography
        fontSize={20}
        color={'secondary.main'}
        fontWeight={500}
        mt={'5px'}
      >
        目标检测
      </Typography>
      <Box sx={mainStyles.function_inner}>
        <Box sx={{ display: !isChecking ? 'block' : 'none' }}>
          <Box sx={mainStyles.upper}>
            <Typography
              fontSize={'1rem'}
              color={'secondary.main'}
              fontWeight={400}
              mb={'5px'}
            >
              待分析图片
            </Typography>
            <MySelect />
          </Box>
          <Box sx={mainStyles.upper}>
            <Typography
              fontSize={'1rem'}
              color={'secondary.main'}
              fontWeight={400}
              mb={'5px'}
            >
              检测对象类型
            </Typography>
            <TypeSelect objectType={objectType} setObjectType={setObjectType} />
          </Box>
          <Box sx={mainStyles.resultName}>
            <Typography
              fontSize={'1rem'}
              color={'secondary.main'}
              fontWeight={400}
              mb={'5px'}
            >
              结果名称
            </Typography>
            <input
              type="text"
              placeholder="请输入结果分析名称，不超过50个字符"
              style={{
                outline: 'none',
                width: '100%',
                boxSizing: 'border-box',
                height: '40px',
                padding: '5px',
                borderRadius: '10px',
                border: '1px solid #01555A'
              }}
              onChange={(e) => {
                setTargetName(e.target.value)
              }}
            />
            <Typography
              fontSize={'0.75rem'}
              color={'secondary.main'}
              fontWeight={400}
              mt={'5px'}
            >
              注：若输出多个分析结果，将会按照结果名称+数字的格式输出
            </Typography>
          </Box>
          <Box sx={mainStyles.btnArea}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                clickToDetect()
              }}
            >
              开始检测
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            display: isChecking ? 'flex' : 'none',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%'
          }}
        >
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Loading />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

const Function = observer(_Function)

export default Function
