import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";
import { Button, Flex,Text } from "@radix-ui/themes"

type Props= {
    itemCount: number,
    pageSize: number,
    currentPage: number
}

const Pagination = ({itemCount, pageSize,currentPage}: Props) => {
    const pageCount= Math.ceil(itemCount/pageSize);
    if (pageCount<=1) return null

  return (
    <Flex align="center" gap='2'>
        <Text size='2'>Page {currentPage} of {pageCount}</Text>
        <Button color="gray" variant="soft" disabled={currentPage===1}> {/* Disabled receives a boolean value*/}
            <DoubleArrowLeftIcon/>
        </Button>
        <Button color="gray" variant="soft" disabled={currentPage===1}> {/* Disabled receives a boolean value*/}
            <ChevronLeftIcon/>
        </Button>
        <Button color="gray" variant="soft" disabled={currentPage===pageCount}> {/* Disabled receives a boolean value*/}
            <ChevronRightIcon/>
        </Button>
        <Button color="gray" variant="soft" disabled={currentPage===pageCount}> {/* Disabled receives a boolean value*/}
            <DoubleArrowRightIcon/>
        </Button>
    </Flex>
  )
}

export default Pagination