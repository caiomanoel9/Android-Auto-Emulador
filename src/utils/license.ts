/**
 * Sistema de Licenciamento e Autenticação por Chave do Produto (Product Key)
 * Desenvolvido para Central Multimídia CarSpecialties Android Auto.
 * 
 * Estrutura da Chave: CSAA-XXXX-XXXX-XXXX
 * - Prefixo fixo: CSAA (CarSpecialties Android Auto)
 * - Bloco 2 e 3: Identificador e lote de compra (8 caracteres alfanuméricos)
 * - Bloco 4: Código de verificação (Checksum ponderado de validação offline)
 */

const KEY_REGEX = /^CSAA-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/i;

// Chaves Mestras Oficiais Pré-aprovadas da CarSpecialties
const MASTER_VALID_KEYS = new Set([
  'CSAA-8842-7719-K92A',
  'CSAA-PREM-2026-X99Z',
  'CSAA-AUTO-4192-M81B',
  'CSAA-GOLD-8024-L77Q',
  'CSAA-CARS-2024-FULL',
  'CSAA-DEMO-TEST-OK24',
]);

/**
 * Calcula o checksum ponderado para os blocos 2 e 3 da chave.
 */
function calculateBlockChecksum(part2: string, part3: string): string {
  const combined = (part2 + part3).toUpperCase();
  let hash = 0x5a17;
  for (let i = 0; i < combined.length; i++) {
    const charCode = combined.charCodeAt(i);
    hash = (hash * 33 + charCode * (i + 3)) & 0xffffff;
  }
  
  // Converte em representação alfanumérica de 4 caracteres
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < 4; i++) {
    result += chars[(hash >> (i * 5)) % chars.length];
  }
  return result;
}

/**
 * Valida se uma chave do produto informada é legítima.
 */
export function validateProductKey(inputKey: string): {
  isValid: boolean;
  formattedKey: string;
  errorMessage?: string;
} {
  const sanitized = inputKey.trim().toUpperCase();

  if (!sanitized) {
    return { isValid: false, formattedKey: sanitized, errorMessage: 'Digite a chave do produto.' };
  }

  // Permite digitação com ou sem hífens
  let normalized = sanitized;
  if (!normalized.includes('-') && normalized.length === 16) {
    normalized = `${normalized.slice(0, 4)}-${normalized.slice(4, 8)}-${normalized.slice(8, 12)}-${normalized.slice(12, 16)}`;
  }

  if (!KEY_REGEX.test(normalized)) {
    return {
      isValid: false,
      formattedKey: normalized,
      errorMessage: 'Formato inválido. Use o padrão: CSAA-XXXX-XXXX-XXXX',
    };
  }

  // Verifica chaves mestras
  if (MASTER_VALID_KEYS.has(normalized)) {
    return { isValid: true, formattedKey: normalized };
  }

  // Validação matemática do algoritmo offline
  const parts = normalized.split('-');
  const [, p2, p3, p4] = parts;
  const expectedChecksum = calculateBlockChecksum(p2, p3);

  if (p4 === expectedChecksum) {
    return { isValid: true, formattedKey: normalized };
  }

  return {
    isValid: false,
    formattedKey: normalized,
    errorMessage: 'Chave do produto inválida ou não reconhecida pela CarSpecialties.',
  };
}

/**
 * Gera uma nova chave válida aleatória para fins administrativos ou emissão de licenças.
 */
export function generateValidProductKey(batchPrefix = '2026'): string {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  const randomBlock = () =>
    Array.from({ length: 4 })
      .map(() => chars[Math.floor(Math.random() * chars.length)])
      .join('');

  const p2 = batchPrefix.length === 4 ? batchPrefix : randomBlock();
  const p3 = randomBlock();
  const p4 = calculateBlockChecksum(p2, p3);

  return `CSAA-${p2}-${p3}-${p4}`;
}

/**
 * Formata o tempo restante (segundos) em mm:ss.
 */
export function formatTrialTime(seconds: number): string {
  if (seconds <= 0) return '00:00';
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export const TRIAL_TOTAL_DURATION_SECONDS = 10 * 60; // 10 minutos = 600s
export const LICENSE_STORAGE_KEY = 'cs_multimedia_license_v2';
