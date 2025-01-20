import { Box, Heading, Text, Flex, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { User } from '@/types';
import PreloadLink from '@/components/common/PreloadLink';

interface ProfileHeaderProps {
  user: User;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  return (
    <Box>
      <Breadcrumb color="gray.300" mb={4} mt={4}>
        <BreadcrumbItem>
          <PreloadLink href="/" props={{}}>
            <BreadcrumbLink as="span">Home</BreadcrumbLink>
          </PreloadLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <PreloadLink href="/u" props={{}}>
            <BreadcrumbLink as="span">Users</BreadcrumbLink>
          </PreloadLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>{user.alias}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Box>
          <Heading as="h1" size="xl" mb={2}>{user.alias}</Heading>
          <Text color="gray.500">{user.address}</Text>
        </Box>
      </Flex>

      <Text mb={6}>{user.description}</Text>
    </Box>
  );
}; 