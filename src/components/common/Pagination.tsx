import { Button, Flex, Text } from '@chakra-ui/react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  return (
    <Flex justify="center" align="center" mt={4} gap={2}>
      <Button
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        isDisabled={currentPage === 1}
        variant="outline"
      >
        Previous
      </Button>
      
      {pages.map((page) => (
        <Button
          key={page}
          size="sm"
          variant={currentPage === page ? "solid" : "outline"}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ))}
      
      <Button
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        isDisabled={currentPage === totalPages}
        variant="outline"
      >
        Next
      </Button>
    </Flex>
  );
};

export default Pagination; 