import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: "Inter", sans-serif;
`;

export const PageTitle = styled.h1`
  color: #2c3e50;
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

export const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto auto;

    & > :first-child {
      grid-column: 1 / -1; 
    }
  }
`;

export const Card = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  z-index: 10;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.12);
  }

  @media (min-width: 768px) and (max-width: 1023px) {
    grid-column: ${(props) => (props.$fullWidth ? "1 / span 2" : "auto")};
  }

  @media (min-width: 1024px) {
    grid-column: ${(props) => (props.$fullWidth ? "1 / span 3" : "auto")};
  }
`;

export const CardTitle = styled.h2`
  color: #3498db;
  font-size: 1.4rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #f2f2f2;
`;

export const StatContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const StatItem = styled.div`
  text-align: center;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  transition: all 0.2s;

  &:hover {
    background: #e9f7fe;
  }
`;

export const StatTitle = styled.h3`
  font-size: 0.9rem;
  color: #7f8c8d;
  margin-bottom: 0.5rem;
`;

export const StatNumber = styled.p`
  font-size: 1.8rem;
  font-weight: 700;
  color: #2c3e50;
`;

export const ChartSection = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 2rem;
`;

export const ChartTitle = styled.h3`
  font-size: 1.1rem;
  color: #34495e;
  margin-bottom: 1rem;
`;

export const KeywordsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const TagCloud = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  margin-top: 1.5rem;
`;

export const KeywordTag = styled.span`
  padding: 0.4rem 0.8rem;
  border-radius: 50px;
  background: ${(props) => `rgba(75, 192, 192, ${props.$opacity})`};
  color: #fff;
  font-size: ${(props) => props.$fontSize};
  transition: all 0.2s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
  }
`;

export const LoadingMessage = styled.div`
  text-align: center;
  padding: 3rem;
  font-size: 1.2rem;
  color: #7f8c8d;
`;

export const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #e74c3c;
  background: #fef2f2;
  border-radius: 8px;
  font-weight: 600;
`;

export const NoDataMessage = styled.p`
  text-align: center;
  color: #95a5a6;
  font-style: italic;
  padding: 1rem 0;
`;
