import { Col, Container, Pagination, Row } from 'react-bootstrap';

const fillItems = (first: number, last: number) => {
  const items = [];
  for (let i = first; i <= last; i++) {
    items.push(i);
  }

  return items;
};

interface ResultsPaginationProps {
  activePage: number;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
  numberOfPages: number;
}

const ResultsPagination = ({
  activePage,
  setActivePage,
  numberOfPages,
}: ResultsPaginationProps) => {
  const firstNumber = activePage - 2 > 1 ? activePage - 2 : 1;
  const lastNumber = activePage + 2 <= numberOfPages ? activePage + 2 : numberOfPages;

  return (
    <Container fluid>
      <Row className="justify-content-md-center">
        <Col md="4">
          <Pagination>
            <Pagination.First onClick={() => setActivePage(1)} />
            <Pagination.Prev
              onClick={() => activePage - 1 > 0 && setActivePage(activePage - 1)}
            />
            {activePage > 2 && firstNumber > 1 && 
              <>
                <Pagination.Item onClick={() => setActivePage(1)}>{1}</Pagination.Item>
                <Pagination.Ellipsis />
              </>
            }

            {fillItems(firstNumber, lastNumber).map(
              (item) => (
                <Pagination.Item
                  key={item}
                  active={item === activePage}
                  onClick={() => setActivePage(item)}
                >
                  {item}
                </Pagination.Item>
              ),
            )}

            {activePage < numberOfPages - 1 && lastNumber < numberOfPages &&
              <>
                <Pagination.Ellipsis />
                <Pagination.Item 
                  onClick={() => setActivePage(numberOfPages)}
                >
                  {numberOfPages}
                </Pagination.Item>
              </>
            }
            <Pagination.Next
              onClick={() =>
                activePage + 1 <= numberOfPages && setActivePage(activePage + 1)
              }
            />
            <Pagination.Last onClick={() => setActivePage(numberOfPages)} />
          </Pagination>
        </Col>
      </Row>
    </Container>
  );
};

export default ResultsPagination;
